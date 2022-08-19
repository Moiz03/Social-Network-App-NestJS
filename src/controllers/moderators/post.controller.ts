import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
} from '@nestjs/common';

import { ModeratorPostService } from 'src/services/moderators/post.service';
import { updatePost } from 'src/dto/post.dto';
import { moderatorId } from 'src/dto/id.dto';

// moderator post controller
@Controller('moderators/posts')
export class ModeratorPostController {
  constructor(private readonly postService: ModeratorPostService) {}

  // get a post
  @Get('/:id')
  async findById(
    @Res() response,
    @Param('id') id,
    @Body() moderator: moderatorId,
  ) {
    try {
      const post = await this.postService.readById(id, moderator.moderatorId);
      return response.status(HttpStatus.OK).json({
        post,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }

  // update the post
  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() post: updatePost & moderatorId,
  ) {
    try {
      const updatedPost = await this.postService.update(id, post);
      return response.status(HttpStatus.OK).json({
        updatedPost,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }

  // delete the post
  @Delete('/:id')
  async delete(
    @Res() response,
    @Param('id') id,
    @Body() moderator: moderatorId,
  ) {
    try {
      const deletedPost = await this.postService.delete(
        id,
        moderator.moderatorId,
      );
      return response.status(HttpStatus.OK).json({
        deletedPost,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }
}
