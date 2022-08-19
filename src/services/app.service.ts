import { Injectable } from '@nestjs/common';

// app services
@Injectable()
export class AppService {
  // welcome msg for client on homepage
  getHello(): string {
    return 'Hi, Welcome to Social Network App!';
  }
}
