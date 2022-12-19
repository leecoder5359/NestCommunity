import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Cats } from '../cats.schema';

export class CatsRequestDto extends PickType(Cats, [
  'email',
  'name',
  'password',
] as const){}
