import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { loginProfile, registerUser } from 'src/dto/auth.dto';
import { User, UserDocument } from '../../schemas/user.schema';
import * as bcrypt from 'bcrypt';

// auth service
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //login function
  async login(data: loginProfile): Promise<string> {
    try {
      // fetching user
      const user = await this.userModel.findOne({ email: data.email });
      const validate = await bcrypt.compare(data.password, user.password);

      // if password is correct then return the userID
      if (validate) {
        return user._id;
      }
    } catch (err) {
      // CASE HANDLE: if email or password is wrong
      throw new NotFoundException('Email or Password is wrong');
    }
  }

  // register fucntion
  async register(data: registerUser): Promise<User> {
    try {
      // hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      // creating new user
      const newUser = new this.userModel({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        userName: data.userName,
        password: hashedPassword,
      });

      // saving user in mongoDb
      return await newUser.save();
    } catch (err) {
      // CASE HANDLE : if email or userName is not unique
      throw new HttpException(
        'Email or Username is not unique',
        HttpStatus.CONFLICT,
      );
    }
  }
}
