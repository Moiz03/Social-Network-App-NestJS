import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post, PostDocument } from 'src/schemas/post.schema';
import { Moderator, ModeratorDocument } from 'src/schemas/moderator.schema';
import { feedQuery } from 'src/dto/feed.dto';

// moderator feed
@Injectable()
export class ModeratorFeedService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Moderator.name)
    private moderatorModel: Model<ModeratorDocument>,
  ) {}

  // feed function
  async feed(id: string, query: feedQuery): Promise<Post[]> {
    // query params
    const page = parseInt(query.page, 10) - 1 || 0;
    const limit = parseInt(query.limit, 10) || 5;
    const sortBy = query.sort || 'date';
    const sortQuery = {};
    sortQuery[sortBy] = sortBy === 'date' ? -1 : 1;

    // fetchig post according to query params
    const posts = await this.postModel
      .find()
      .select('-userId -userName')
      .sort(sortQuery)
      .skip(page * limit)
      .limit(limit);

    // return posts
    return posts;
  }
}
