import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      data: [
        {
          test: 1,
          test2: 2,
          test3: 3,
        },
      ],
    };
  }
}
