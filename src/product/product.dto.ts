import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { BaseDto } from "../config/base.dto";
import { Category } from "../category/category.entity";
import { Size } from "../size/size.entity";

export class ProductDto extends BaseDto {
  @IsNotEmpty()
  @Length(1, 50)
  name!: string;

  @IsNotEmpty()
  @Length(1, 50)
  description!: string;

  @IsNotEmpty()
  @Length(1, 900)
  img!: string;

  @IsOptional()
  stock?: boolean;

  @IsNotEmpty()
  price!: number;

  @IsNotEmpty()
  size!: Size[];

  @IsNotEmpty()
  category!: Category;
}
