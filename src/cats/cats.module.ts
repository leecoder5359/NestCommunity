import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './controllers/cats.controller';
import { CatsRepository } from './cats.repository';
import { Cats, CatSchema } from './cats.schema';
import { CatsService } from './services/cats.service';
import { CommentsSchema, Comments } from '../comments/comments.schema';
import { AwsService } from 'src/aws/aws.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
      { name: Cats.name, schema: CatSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository, AwsService],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
