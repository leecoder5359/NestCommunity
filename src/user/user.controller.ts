import { Body, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { SuccessInterceptor } from '../common/interceptions/success.interceptor';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(':name')
  getNameUser(@Param() param) {
    console.log(param);
    return this.userService.getUser(param.name);
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadCat';
  }
}
