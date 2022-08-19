import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModeratorController } from 'src/controllers/moderators/moderator.controller';
import { Moderator, ModeratorSchema } from 'src/schemas/moderator.schema';
import { ModeratorService } from 'src/services/moderators/moderator.service';

// moderator module
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Moderator.name, schema: ModeratorSchema },
    ]),
  ],
  controllers: [ModeratorController],
  providers: [ModeratorService],
})
export class ModeratorModule {}
