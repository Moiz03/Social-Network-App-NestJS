import { Body, Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';

import { Response } from 'express';
import { feedQuery } from 'src/dto/feed.dto';
import { userId } from 'src/dto/id.dto';
import { FeedService } from 'src/services/users/feed.service';

// feed controlller
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  // get the feed
  @Get('/?')
  async feed(
    @Res() response: Response,
    @Body() user: userId,
    @Query() query: feedQuery,
  ) {
    try {
      const posts = await this.feedService.feed(user.userId, query);
      return response.status(HttpStatus.CREATED).json({ posts });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }
}
