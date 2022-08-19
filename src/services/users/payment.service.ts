import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from 'src/dto/payment.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import Stripe from 'stripe';

// paymeny service
@Injectable()
export class PaymentService {
  private stripe: Stripe;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    // stripe key connection
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-08-01',
    });
  }

  // payment function
  async payment(data: Payment): Promise<any> {
    // fetching user
    const user = await this.userModel.findById(data.userId);

    // CASE HANDLE: is user already paid the subscription
    if (user.subscribed) {
      throw new ConflictException('user already paid');
    }

    // creating strip customer
    const customer = await this.stripe.customers.create({
      name: data.customerName,
      email: data.customerEmail,
    });

    // creating stripe token
    const card_Token = await this.stripe.tokens.create({
      card: {
        name: data.cardName,
        number: data.cardNumber,
        exp_month: data.expMonth,
        exp_year: data.expYear,
        cvc: data.cvc,
      },
    });

    // creating payment source for customer by stripe
    const card = await this.stripe.customers.createSource(customer.id, {
      source: `${card_Token.id}`,
    });

    // charing cusomter for feed
    await this.stripe.charges.create({
      amount: 5 * 100, // $5
      currency: 'usd',
      customer: customer.id,
      description: 'Feed Content Payment',
      source: card.id,
    });

    // updating user information that user paid for Feed
    await this.userModel.findByIdAndUpdate(data.userId, {
      subscribed: true,
    });

    // return success message
    return `${user.userName} paid successfully for Feed Content`;
  }
}
