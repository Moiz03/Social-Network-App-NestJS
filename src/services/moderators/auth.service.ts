import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { loginProfile, registerModerator } from 'src/dto/auth.dto';
import { Moderator, ModeratorDocument } from '../../schemas/moderator.schema';
import * as bcrypt from 'bcrypt';

// moderator auth
@Injectable()
export class ModeratorAuthService {
  constructor(
    @InjectModel(Moderator.name)
    private moderatorModel: Model<ModeratorDocument>,
  ) {}

  // login function
  async login(data: loginProfile): Promise<string> {
    try {
      // fetching moderator

      const moderator = await this.moderatorModel.findOne({
        email: data.email,
      });
      const validate = await bcrypt.compare(data.password, moderator.password);

      // if password is correct then return the userID
      if (validate) {
        return moderator._id;
      }
    } catch (err) {
      // CASE HANDLE: if email or password is wrong
      throw new NotFoundException('Email or Password is wrong');
    }
  }

  // register function
  async register(data: registerModerator): Promise<Moderator> {
    try {
      // hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      // creating new moderator
      const newModerator = new this.moderatorModel({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      });

      // saving moderator in mongoDb
      return await newModerator.save();
    } catch (err) {
      // CASE HANDLE : if email or userName is not unique
      throw new HttpException(
        'Email or Moderatorname is not unique',
        HttpStatus.CONFLICT,
      );
    }
  }
}
