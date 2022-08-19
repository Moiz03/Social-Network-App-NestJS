import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ModeratorFeedController } from 'src/controllers/moderators/feed.controller';
import { ModeratorController } from 'src/controllers/moderators/moderator.controller';
import { ModeratorPostController } from 'src/controllers/moderators/post.controller';
import { FeedController } from 'src/controllers/users/feed.controller';
import { PaymentController } from 'src/controllers/users/payment.controller';
import { PostController } from 'src/controllers/users/post.controller';
import { UserController } from 'src/controllers/users/user.controller';
import { tokenVerification } from 'src/middlewar/tokenVerification.middleware';
import { SocketsModule } from 'src/socket/socket.modules';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ModeratorAuthModule } from './moderators/auth.module';
import { ModeratorFeedModule } from './moderators/feed.module';
import { ModeratorModule } from './moderators/moderator.module';
import { ModeratorPostModule } from './moderators/post.module';
import { AuthModule } from './users/auth.module';
import { FeedModule } from './users/feed.module';
import { PaymentModule } from './users/payment.module';
import { PostModule } from './users/post.module';
import { UserModule } from './users/user.module';

// app module
@Module({
  imports: [
    SocketsModule,
    ModeratorAuthModule,
    ModeratorFeedModule,
    ModeratorPostModule,
    FeedModule,
    PaymentModule,
    AuthModule,
    PostModule,
    UserModule,
    ModeratorModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_CONNECTION),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // token verification middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(tokenVerification)
      .forRoutes(
        PostController,
        UserController,
        FeedController,
        PaymentController,
        ModeratorPostController,
        ModeratorController,
        ModeratorFeedController,
      );
  }
}
