import { IsInt, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductsDto{

    @IsString()
    @MinLength(2)
    name : string;


    @IsInt()
    @IsPositive()
    price: number;

}