import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModeratorAuthController } from 'src/controllers/moderators/auth.controller';
import { Moderator, ModeratorSchema } from 'src/schemas/moderator.schema';
import { ModeratorAuthService } from 'src/services/moderators/auth.service';

// moderator auth module
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Moderator.name, schema: ModeratorSchema },
    ]),
  ],
  controllers: [ModeratorAuthController],
  providers: [ModeratorAuthService],
})
export class ModeratorAuthModule {}
