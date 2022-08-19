import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { updateProfile } from 'src/dto/updateProfile.dto';
import { Moderator, ModeratorDocument } from '../../schemas/moderator.schema';
import * as bcrypt from 'bcrypt';
import { moderatorId } from 'src/dto/id.dto';

// moderator service
@Injectable()
export class ModeratorService {
  constructor(
    @InjectModel(Moderator.name)
    private moderatorModel: Model<ModeratorDocument>,
  ) {}

  // update function
  async update(data: updateProfile & moderatorId): Promise<{
    firstName: string;
    lastName: string;
    email: string;
  }> {
    const updateData = data;

    // if password is present then hash it before saving it
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(data.password, salt);
    }

    // finding and updating moderator
    const moderator = await this.moderatorModel.findByIdAndUpdate(
      data.moderatorId,
      updateData,
      {
        new: true,
      },
    );

    // return the moderator data except id and password
    const { firstName, lastName, email } = moderator;
    return { firstName, lastName, email };
  }

  // delete a moderator
  async delete(id: string): Promise<string> {
    // deleting a moderator
    await this.moderatorModel.findByIdAndRemove(id);

    // returning a moderator id
    return id;
  }
}
