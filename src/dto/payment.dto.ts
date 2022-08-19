import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

// payment moderator
export class Payment {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  cardName: string;

  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  expMonth: string;

  @IsString()
  @IsNotEmpty()
  @Length(4)
  expYear: string;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  cvc: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
