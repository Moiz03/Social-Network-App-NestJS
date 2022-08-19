import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  // first name of user which is string with maximum length 50.
  @Prop({
    type: String,
    required: true,
    max: 50,
  })
  firstName: string;

  // last name of user which is string with maximum length 50.
  @Prop({
    type: String,
    max: 50,
    default: '',
  })
  lastName: string;

  // userName of user which is string with minimum length 3 and maximum length 50. and should be unique
  @Prop({
    type: String,
    required: true,
    min: 3,
    max: 50,
    unique: true,
  })
  userName: string;

  // email of user which should be unique
  @Prop({
    type: String,
    required: true,
    max: 50,
    unique: true,
  })
  email: string;

  // password of user whose length should be atleast 6 character long
  @Prop({
    type: String,
    required: true,
    min: 6,
  })
  password: string;

  // array of users to whom the user is following
  @Prop({
    type: Array,
    default: [],
  })
  followings: string[];

  // true, if paid the amount and can enjoy Feed of Social Network App
  @Prop({
    type: Boolean,
    default: false,
  })
  subscribed: boolean;

  // date on which object is created
  @Prop({
    type: Date,
    default: Date.now,
  })
  date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
