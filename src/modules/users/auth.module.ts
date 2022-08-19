import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/controllers/users/auth.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthService } from 'src/services/users/auth.service';

//auth module
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
