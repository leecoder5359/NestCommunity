import { Injectable } from "@nestjs/common";
import { PickType } from "@nestjs/swagger";
import { Cats } from "src/cats/cats.schema";

@Injectable()
export class LoginRequestDto extends PickType(Cats, [
    'email',
    'password',
] as const){}