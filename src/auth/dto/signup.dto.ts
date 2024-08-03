import { IsString, MinLength } from "class-validator";

export class SignUpDto {

    @IsString()
    readonly name: string;

    @IsString()
    @MinLength(6)
    readonly password: string;

}