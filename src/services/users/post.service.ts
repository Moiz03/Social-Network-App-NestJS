import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userId } from 'src/dto/id.dto';
import { createPost, updatePost } from 'src/dto/post.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { SocketsGateway } from 'src/socket/socket.gateway';
import { Post, PostDocument } from '../../schemas/post.schema';
// post services
@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly sockets: SocketsGateway,
  ) {}

  // create post
  async create(post: createPost): Promise<{
    postId: string;
    userName: string;
    title: string;
    description: string;
  }> {
    // creating new post object
    const newPost = new this.postModel(post);

    // saving it in mongoDb
    const data = await newPost.save();

    // sending message to every listener that post is uploaded
    this.sockets.handleNewPost(data._id);

    // reutrn post except userId
    return {
      postId: data._id,
      userName: data.userName,
      title: data.title,
      description: data.description,
    };
  }

  // return post
  async readById(
    id: string,
    userId: string,
  ): Promise<{
    postId: string;
    userName: string;
    title: string;
    description: string;
  }> {
    // fetching user and post
    const data = await this.postModel.findById(id);
    const user = await this.userModel.findById(userId);

    // CASE HANDLE: if user or post not found
    if (!data || !user) {
      throw new BadRequestException('bad request');
    }

    // CASE HANDLE: if user is not owner and alos didn't paid subscription yet
    if (userId !== data.userId && !user.subscribed) {
      throw new ForbiddenException('User not subscribed');
    }

    // return post information except userId
    return {
      postId: data._id,
      userName: data.userName,
      title: data.title,
      description: data.description,
    };
  }

  // updating post
  async update(
    id: string,
    data: updatePost & userId,
  ): Promise<{
    postId: string;
    userName: string;
    title: string;
    description: string;
  }> {
    // fetching post
    const post = await this.postModel.findById(id);

    // CASE HANDLE: post not found or user is not owner of post
    if (!post || post.userId !== data.userId) {
      throw new BadRequestException('bad request');
    }

    // updating post
    const updatedPost = await this.postModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    // sending message to all listener that post is updated
    this.sockets.handleUpdatedPost(id);

    // return post information except userId
    return {
      postId: updatedPost._id,
      userName: updatedPost.userName,
      title: updatedPost.title,
      description: updatedPost.description,
    };
  }

  // delete the post
  async delete(id: string, userId: string): Promise<string> {
    // fetching post
    const post = await this.postModel.findById(id);

    // CASE HANDLE: if post not found
    if (!post || post.userId !== userId) {
      throw new BadRequestException('bad request');
    }

    // removing post
    await this.postModel.findByIdAndRemove(id);

    // sending message to all listener that post is deleted
    this.sockets.handleDeletedPost(id);

    //return postID
    return id;
  }
}
