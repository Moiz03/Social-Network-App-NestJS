import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { feedQuery } from 'src/dto/feed.dto';

// user feed
@Injectable()
export class FeedService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // feed function
  async feed(id: string, query: feedQuery): Promise<Post[]> {
    // query params
    const page = parseInt(query.page, 10) - 1 || 0;
    const limit = parseInt(query.limit, 10) || 5;
    const sortBy = query.sort || 'date';
    const sortQuery = {};
    sortQuery[sortBy] = sortBy === 'date' ? -1 : 1;

    // fetching user
    const user = await this.userModel.findById(id);

    // CASE HANDLE: if user not paid the subscription yet
    if (!user.subscribed) throw new ForbiddenException('User not subscribed');

    // fetching all posts according to query params
    const posts = await this.postModel
      .find()
      .where('userName')
      .in([user.userName, ...user.followings])
      .select('-userId')
      .sort(sortQuery)
      .skip(page * limit)
      .limit(limit);

    // returning posts
    return posts;
  }
}
