import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from 'src/controllers/users/payment.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { PaymentService } from 'src/services/users/payment.service';

// payment module
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
