import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';

import { Response } from 'express';
import { loginProfile, registerUser } from 'src/dto/auth.dto';

import { AuthService } from 'src/services/users/auth.service';
import * as jwt from 'jsonwebtoken';

// auth controller
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // register user
  @Post('register/')
  async registerUser(@Res() response, @Body() user: registerUser) {
    try {
      const newUser = await this.authService.register(user);
      return response.status(HttpStatus.CREATED).json({
        newUser,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }

  // login user
  @Get('login/')
  async loginUser(@Res() response: Response, @Body() user: loginProfile) {
    try {
      const newUser = await this.authService.login(user);
      const authToken = jwt.sign({ id: newUser }, process.env.TOKEN_SECRET, {
        expiresIn: '1d',
      });
      response.setHeader('authToken', authToken);

      return response.status(HttpStatus.CREATED).json({ newUser });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }
}
