import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import * as mongoose from 'mongoose';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGODB_URI, {
    //   useNewUrlParser: true, // - mongodb url을 읽을 수 있도록 설정합니다. 설정하지 않으면 다음과 같은 경고가 뜹니다
    //   // useUnifiedTopology: true, // - 최신 mongodb 드라이버 엔진을 사용하도록 설정합니다. (안정적인 연결을 유지할 수 없는 경우를 제외하고 이 옵션을 true로 설정해야 합니다.)
    //   // useCreateIndex: true,
    //   // useFindAndModify: false,
    // }),
    MongooseModule.forRoot(process.env.MONGODB_URI2, {
      useNewUrlParser: true,
    }),
    CatsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', true);
  }
}
