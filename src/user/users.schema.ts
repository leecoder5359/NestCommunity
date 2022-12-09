import { SchemaOptions, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export type UserDocument = User & Document;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  @Prop()
  @IsString()
  role: string;

  @Prop()
  @IsString()
  status: string;

  @Prop()
  @IsString()
  description: string;

  @Prop()
  @IsString()
  image: string;

  @Prop()
  provider: [string];

  @Prop()
  @IsString()
  country: string;

  @Prop()
  @IsString()
  language: string;

  @Prop()
  @IsString()
  admin_memo: string;

  @Prop()
  ip: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
