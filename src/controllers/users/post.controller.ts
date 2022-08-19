import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { PostService } from 'src/services/users/post.service';
import { createPost, updatePost } from 'src/dto/post.dto';
import { userId } from 'src/dto/id.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // post create
  @Post()
  async createPost(@Res() response, @Body() post: createPost) {
    try {
      const newPost = await this.postService.create(post);

      return response.status(HttpStatus.CREATED).json({
        newPost,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }

  // get post
  @Get('/:id')
  async findById(@Res() response, @Param('id') id, @Body() user: userId) {
    try {
      const post = await this.postService.readById(id, user.userId);
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

  // change post
  @Put('/:id')
  async update(
    @Res() response,
    @Param('id') id,
    @Body() post: updatePost & userId,
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

  // delete user
  @Delete('/:id')
  async delete(@Res() response, @Param('id') id, @Body() user: userId) {
    try {
      const deletedPost = await this.postService.delete(id, user.userId);
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
