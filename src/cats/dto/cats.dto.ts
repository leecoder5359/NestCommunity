import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Cats } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cats, ['email', 'name'] as const){
    @ApiProperty({
        example: '638e7fac2419dfe0b7d077e1',
        description: 'id',
    })
    @IsNotEmpty()
    id: string;
}
