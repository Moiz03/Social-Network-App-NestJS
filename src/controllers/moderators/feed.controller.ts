import { Body, Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';

import { Response } from 'express';
import { feedQuery } from 'src/dto/feed.dto';
import { moderatorId } from 'src/dto/id.dto';
import { ModeratorFeedService } from 'src/services/moderators/feed.service';

// moderator feed
@Controller('moderators/feed')
export class ModeratorFeedController {
  constructor(private readonly feedService: ModeratorFeedService) {}
  // feed function
  @Get('/?')
  async feed(
    @Res() response: Response,
    @Body() moderator: moderatorId,
    @Query() query: feedQuery,
  ) {
    try {
      const posts = await this.feedService.feed(moderator.moderatorId, query);
      return response.status(HttpStatus.CREATED).json({ posts });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }
}
