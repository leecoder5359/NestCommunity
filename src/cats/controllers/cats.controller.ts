import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { SuccessInterceptor } from '../../common/interceptions/success.interceptor';
import { CatsRequestDto } from '../dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cats.dto';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { Cats } from '../cats.schema';
import { AwsService } from 'src/aws/aws.service';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
    private readonly awsService: AwsService,
  ) {}

  @ApiOperation({ summary: '유저 목록' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signUp(@Body() body: CatsRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    console.log('data', data);
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '업로드 이미지' })
  // @UseInterceptors(FileInterceptor('image'))//단일 이미지 업로드
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))//여러 이미지 업로드
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(
    @CurrentUser() cat: Cats,
    @UploadedFiles() files: Express.Multer.File,
  ) {
    console.log('file', files);
    return this.catsService.uploadImg(cat, files);

    // console.log('file',file);
  }

  @ApiOperation({ summary: '업로드 이미지 주소 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Post('cats')
  getImageUrl(@Body('key') key: string) {
    return this.awsService.getAwsS3FileUrl(key);
  }

  @ApiOperation({ summary: '모든 유저 가져오기' })
  @Get('all')
  getAllUser() {
    return this.catsService.getAllUser();
  }


}
