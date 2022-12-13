import { Injectable } from "@nestjs/common";
import { PickType } from "@nestjs/swagger";
import { Cat } from "src/cats/cats.schema";

@Injectable()
export class LoginRequestDto extends PickType(Cat, [
    'email',
    'password',
] as const){}