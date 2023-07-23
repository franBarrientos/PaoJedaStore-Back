import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
import { BaseDto } from "../config/base.dto";
import { Product } from "../product/product.entity";
import { sizesType } from "./size.entity";
import { ProductsSizes } from "../product/products-sizes/products-sizes.entity";

export class UserDto extends BaseDto {
  @IsNotEmpty()
  name!: sizesType;

  @IsOptional()
  description?: string;
}
