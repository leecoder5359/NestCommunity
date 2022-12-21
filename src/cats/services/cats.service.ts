import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CatsRequestDto } from '../dto/cats.request.dto';
import { Model } from 'mongoose';
import { Cats } from '../cats.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from "../cats.repository";
import { AuthService } from "src/auth/auth.service";
import { AwsService } from "src/aws/aws.service";

@Injectable()
export class CatsService {
  // constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {} // repository pattern 미적용 시
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly awsService: AwsService,
  ) {} // repository pattern 적용 시

  hiCatServiceProduct() {
    return 'hello cat!';
  }

  async signUp(body: CatsRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      /** 해당 방법과 동일
       * throw new HttpException('해당하는 고양이는 이미 존재합니다.', 403);
       * */
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  async uploadImg(cat: Cats, file: Express.Multer.File) {
    console.log('file',file[0]);
    const fileName = `cats/${file[0].filename}`;
    console.log(fileName);

    const s3Upload = await this.awsService.uploadFileToS3('cats', file);
    console.log('s3Upload', s3Upload);

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      s3Upload.key
    )
    console.log(newCat);
    return newCat;
  }

  async getAllUser() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }
}
