import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUser(): Promise<any> {
    const result = await this.userModel.find({}).lean();
    return result;
  }

  async getUser(name: string): Promise<any> {
    const result = await this.userModel.find({ name: name }).lean();
    return result;
  }
}
