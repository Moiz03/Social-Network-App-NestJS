import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

// socket
@WebSocketGateway()
export class SocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private count = 1;

  // on connection with socket
  handleConnection() {
    console.log(`Client # ${this.count} connected`);
    this.count += 1;
  }

  // on disconnect from socket
  handleDisconnect() {
    this.count -= 1;
    console.log(`Client # ${this.count} disconnected`);
  }

  // when new post uploaded
  handleNewPost(id: string) {
    this.server.emit('newPost', { postId: id });
  }

  // when any post updated
  handleUpdatedPost(id: string) {
    this.server.emit('updatedPost', { postId: id });
  }

  // when any post deleted
  handleDeletedPost(id: string) {
    this.server.emit('deletedPost', { postId: id });
  }
}
