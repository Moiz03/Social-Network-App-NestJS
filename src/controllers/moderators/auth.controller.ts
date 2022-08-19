import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';

import { Response } from 'express';
import { loginProfile, registerModerator } from 'src/dto/auth.dto';

import { ModeratorAuthService } from 'src/services/moderators/auth.service';

import * as jwt from 'jsonwebtoken';

// moderator auth
@Controller('moderators/auth')
export class ModeratorAuthController {
  constructor(private readonly authService: ModeratorAuthService) {}

  // register moderator
  @Post('register/')
  async registerModerator(
    @Res() response,
    @Body() moderator: registerModerator,
  ) {
    try {
      const newModerator = await this.authService.register(moderator);
      return response.status(HttpStatus.CREATED).json({
        newModerator,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }

  // login
  @Get('login/')
  async loginModerator(
    @Res() response: Response,
    @Body() moderator: loginProfile,
  ) {
    try {
      // authentication token
      const newModerator = await this.authService.login(moderator);

      const authToken = jwt.sign(
        { id: newModerator },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '1d',
        },
      );
      response.setHeader('authToken', authToken);

      return response.status(HttpStatus.CREATED).json({ newModerator });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }
}
