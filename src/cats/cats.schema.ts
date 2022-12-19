import { SchemaOptions, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Comments } from 'src/comments/comments.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cats extends Document {
  @ApiProperty({
    example: 'leecoder5359@gmail.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'leecoder',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123456',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  password: string;

  @Prop({
    default: 'http://localhost:8005/media/cats/test1671063288664.png',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string; 
    email: string; 
    name: string;
    imgUrl: string;
    comments: Comments[];
  }

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cats);

_CatSchema.virtual('readOnlyData').get(function(this: Cats) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments
  }
})

_CatSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});

_CatSchema.set('toObject', { virtuals: true });

_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;