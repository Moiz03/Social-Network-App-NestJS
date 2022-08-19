import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { moderatorId } from 'src/dto/id.dto';
import { updatePost } from 'src/dto/post.dto';
import { Moderator, ModeratorDocument } from 'src/schemas/moderator.schema';
import { SocketsGateway } from 'src/socket/socket.gateway';
import { Post, PostDocument } from '../../schemas/post.schema';

// moderator post service

@Injectable()
export class ModeratorPostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Moderator.name)
    private moderatorModel: Model<ModeratorDocument>,
    private readonly sockets: SocketsGateway,
  ) {}

  // get a post
  async readById(
    id: string,
    moderatorId: string,
  ): Promise<{
    postId: string;
    title: string;
    description: string;
  }> {
    // fetching post and moderator
    const data = await this.postModel.findById(id);
    const moderator = await this.moderatorModel.findById(moderatorId);

    // CASE HANDLE: if moderator or post not found
    if (!data || !moderator) {
      throw new BadRequestException('bad request');
    }

    // return post with user information
    return {
      postId: data._id,
      title: data.title,
      description: data.description,
    };
  }

  // update a post
  async update(
    id: string,
    data: updatePost & moderatorId,
  ): Promise<{
    postId: string;
    title: string;
    description: string;
  }> {
    // fetching post and moderator
    const post = await this.postModel.findById(id);
    const moderator = await this.moderatorModel.findById(moderatorId);

    // CASE HANDLE: if moderator or post not found
    if (!post || !moderator) {
      throw new BadRequestException('bad request');
    }

    // update the post
    const updatedPost = await this.postModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    // send message to listener that post is updated
    this.sockets.handleUpdatedPost(id);

    // return post without user information
    return {
      postId: updatedPost._id,
      title: updatedPost.title,
      description: updatedPost.description,
    };
  }

  // delete a post
  async delete(id: string, moderatorId: string): Promise<string> {
    // fetching post and moderator
    const post = await this.postModel.findById(id);
    const moderator = await this.moderatorModel.findById(moderatorId);

    // CASE HANDLE: if post or moderator is not found
    if (!post || !moderator) {
      throw new BadRequestException('bad request');
    }
    // deleting post
    await this.postModel.findByIdAndRemove(id);

    // send message to listeners that post is deleted
    this.sockets.handleDeletedPost(id);

    //return postID
    return id;
  }
}
