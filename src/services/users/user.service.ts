import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { updateProfile } from 'src/dto/updateProfile.dto';
import { User, UserDocument } from '../../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { userId } from 'src/dto/id.dto';

// user services

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // get any user
  async getUser(_userName: string): Promise<{
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
  }> {
    // fetching user
    const user = await this.userModel.findOne({ userName: _userName });

    // return user information but not its mongo ID or password
    const { firstName, lastName, email, userName } = user;
    return { firstName, lastName, email, userName };
  }

  // updating user
  async update(data: updateProfile & userId): Promise<{
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
  }> {
    const updateData = data;

    // checking if passowrd is present, if yes then hash it before putting in mongo
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(data.password, salt);
    }

    // finding user and updating it
    const user = await this.userModel.findByIdAndUpdate(
      data.userId,
      updateData,
      {
        new: true,
      },
    );

    // return user data but not its password or id
    const { firstName, lastName, email, userName } = user;
    return { firstName, lastName, email, userName };
  }

  // delete user
  async delete(id: string): Promise<string> {
    // deleting user
    await this.userModel.findByIdAndRemove(id);
    return id;
  }

  // follow user
  async follow(id: string, _userName: string): Promise<string> {
    // fetching both user
    const user = await this.userModel.findById(id);
    const followUser = await this.userModel.findOne({ userName: _userName });

    // CASE HANDLE:
    // 1. If user or followUser not presnt
    // 2. if users try to follow themselves
    // 3. if user already following that user
    if (
      !user ||
      !followUser ||
      user.userName === followUser.userName ||
      user.followings.includes(_userName)
    ) {
      throw new BadRequestException('bad request');
    }

    // adding followUser in followings list
    await user.updateOne({ $push: { followings: followUser.userName } });

    // success message
    return `${user.userName} is now following ${_userName}`;
  }

  // unfollow user
  async unfollow(id: string, _userName: string): Promise<string> {
    // fetching both users
    const user = await this.userModel.findById(id);
    const unfollowUser = await this.userModel.findOne({ userName: _userName });

    // CASE HANDLE:
    // 1. If user or unfollowUser not presnt
    // 2. if users try to unfollow themselves
    // 3. if user already not following that user
    if (
      !user ||
      !unfollowUser ||
      user.userName === unfollowUser.userName ||
      !user.followings.includes(_userName)
    ) {
      throw new BadRequestException('bad request');
    }

    // removing unfollowUser from followings list
    await user.updateOne({ $pull: { followings: unfollowUser.userName } });

    // success message
    return `${user.userName} unfollowed ${_userName}`;
  }
}
