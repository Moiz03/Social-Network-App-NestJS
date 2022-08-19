import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModeratorPostController } from 'src/controllers/moderators/post.controller';

import { Post, PostSchema } from 'src/schemas/post.schema';
import { Moderator, ModeratorSchema } from 'src/schemas/moderator.schema';
import { ModeratorPostService } from 'src/services/moderators/post.service';
import { SocketsGateway } from 'src/socket/socket.gateway';

// moderator post module
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Moderator.name, schema: ModeratorSchema },
    ]),
  ],
  controllers: [ModeratorPostController],
  providers: [ModeratorPostService, SocketsGateway],
})
export class ModeratorPostModule {}
