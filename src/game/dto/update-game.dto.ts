import { IsEmpty, IsEnum, IsNumber, IsString } from "class-validator";
import { Category } from "../schemas/game.schema"
import { User } from "../../auth/schemas/user.schema";

export class UpdateGameDto {

    @IsString()
    readonly title: string;

    @IsString()
    readonly publisher: string;

    @IsString()
    readonly description: string;

    @IsNumber()
    readonly price: number;

    @IsEnum(Category)
    readonly category: Category;

    @IsEmpty()
    readonly user: User;
}