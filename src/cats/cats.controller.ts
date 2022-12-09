import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { PositiveIntPipe } from '../common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from '../common/interceptions/success.interceptor';
import { CatsRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cats.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: "유저 목록" })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: ReadOnlyCatDto
  })
  @ApiOperation({ summary: "회원가입" })
  @Post('signup')
  async signUp(@Body() body: CatsRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: "로그인" })
  @Post('login')
  logIn() {
    return 'login';
  }

  @ApiOperation({ summary: "로그아웃" })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: "업로드 이미지" })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadCat';
  }
}
