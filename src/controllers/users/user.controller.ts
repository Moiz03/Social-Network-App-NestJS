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
import { userId } from 'src/dto/id.dto';
import { updateProfile } from 'src/dto/updateProfile.dto';
import { UserService } from 'src/services/users/user.service';

// user controller
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get user
  @Get('/:userName')
  async findById(@Res() response, @Param('userName') userName) {
    try {
      const user = await this.userService.getUser(userName);
      return response.status(HttpStatus.OK).json({
        user,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }

  // update user
  @Put('/')
  async update(@Res() response, @Body() data: updateProfile & userId) {
    try {
      const updatedUser = await this.userService.update(data);
      return response.status(HttpStatus.OK).json({
        updatedUser,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }

  // delete user
  @Delete('/')
  async delete(@Res() response, @Body() user: userId) {
    try {
      const deletedUser = await this.userService.delete(user.userId);
      return response.status(HttpStatus.OK).json({
        deletedUser,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }

  // follow user
  @Put('/:userName/follow')
  async follow(
    @Res() response,
    @Body() user: userId,
    @Param('userName') userName: string,
  ) {
    try {
      const followedUser = await this.userService.follow(user.userId, userName);
      return response.status(HttpStatus.OK).json({
        followedUser,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }

  // unfollow user
  @Put('/:userName/unfollow')
  async unfollow(
    @Res() response,
    @Body() user: userId,
    @Param('userName') userName: string,
  ) {
    try {
      const unfollowedUser = await this.userService.unfollow(
        user.userId,
        userName,
      );
      return response.status(HttpStatus.OK).json({
        unfollowedUser,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }
}
