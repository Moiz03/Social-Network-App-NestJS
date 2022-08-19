import { Module } from '@nestjs/common';
import { SocketsGateway } from './socket.gateway';

// socket module
@Module({
  providers: [SocketsGateway],
})
export class SocketsModule {}
