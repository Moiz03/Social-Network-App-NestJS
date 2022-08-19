import { Body, Controller, Delete, HttpStatus, Put, Res } from '@nestjs/common';
import { moderatorId } from 'src/dto/id.dto';
import { updateProfile } from 'src/dto/updateProfile.dto';
import { ModeratorService } from 'src/services/moderators/moderator.service';

// moderator controller
@Controller('moderators')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  // chaging moderator
  @Put('/')
  async update(@Res() response, @Body() data: updateProfile & moderatorId) {
    try {
      const updatedModerator = await this.moderatorService.update(data);
      return response.status(HttpStatus.OK).json({
        updatedModerator,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }

  // deleting moderator
  @Delete('/')
  async delete(@Res() response, @Body() moderator: moderatorId) {
    try {
      const deletedModerator = await this.moderatorService.delete(
        moderator.moderatorId,
      );
      return response.status(HttpStatus.OK).json({
        deletedModerator,
      });
    } catch (err) {
      if (err.status) {
        return response.status(err.status).json(err.message);
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
    }
  }
}
