import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService {
  getHello() {
    return 'Hello World!';
  }
}
