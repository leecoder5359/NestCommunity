import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CatsRequestDto } from '../dto/cats.request.dto';
import { Model } from 'mongoose';
import { Cats } from '../cats.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from "../cats.repository";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class CatsService {
  // constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {} // repository pattern 미적용 시
  constructor(
    private readonly catsRepository: CatsRepository,
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

  async uploadImg(cat: Cats, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    console.log(fileName);
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName
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
