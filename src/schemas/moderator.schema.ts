import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModeratorDocument = Moderator & Document;

@Schema()
export class Moderator {
  // first name of moderator which is string with maximum length 50.
  @Prop({
    type: String,
    required: true,
    max: 50,
  })
  firstName: string;

  // last name of moderator which is string with maximum length 50.
  @Prop({
    type: String,
    max: 50,
    default: '',
  })
  lastName: string;

  // email of moderator which should be unique
  @Prop({
    type: String,
    required: true,
    max: 50,
    unique: true,
  })
  email: string;

  // password of moderator whose length should be atleast 6 character long
  @Prop({
    type: String,
    required: true,
    min: 6,
  })
  password: string;

  // date on which object is created
  @Prop({
    type: Date,
    default: Date.now,
  })
  date: Date;
}

export const ModeratorSchema = SchemaFactory.createForClass(Moderator);
