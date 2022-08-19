import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModeratorFeedController } from 'src/controllers/moderators/feed.controller';
import { Post, PostSchema } from 'src/schemas/post.schema';
import { Moderator, ModeratorSchema } from 'src/schemas/moderator.schema';
import { ModeratorFeedService } from 'src/services/moderators/feed.service';

// moderator feed module
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Moderator.name, schema: ModeratorSchema },
    ]),
  ],
  controllers: [ModeratorFeedController],
  providers: [ModeratorFeedService],
})
export class ModeratorFeedModule {}
