import { Body, Controller, Get, HttpStatus, Res } from '@nestjs/common';

import { Response } from 'express';
import { Payment } from 'src/dto/payment.dto';
import { PaymentService } from 'src/services/users/payment.service';

// payment controller
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // do payment
  @Get()
  async payment(@Res() response: Response, @Body() data: Payment) {
    try {
      const posts = await this.paymentService.payment(data);
      return response.status(HttpStatus.CREATED).json({ posts });
    } catch (err) {
      if (err.statusCode) {
        return response.status(err.statusCode).json('Payment Failed');
      }
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }
}
