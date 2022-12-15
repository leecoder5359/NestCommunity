import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cats/services/cats.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catService: CatsService,
  ) {}
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/cat-hello')
  catHello(): string {
    return this.catService.hiCatServiceProduct();
  }
}
