import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  // userID of owner
  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  /// userName of owner
  @Prop({
    type: String,
    required: true,
    min: 3,
    max: 50,
  })
  userName: string;

  // title of post
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  // description of post
  @Prop({
    type: String,
    required: true,
  })
  description: string;

  // date at which posted
  @Prop({
    type: Date,
    default: Date.now,
  })
  date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
