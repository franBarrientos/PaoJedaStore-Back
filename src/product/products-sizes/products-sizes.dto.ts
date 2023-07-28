import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { Product } from "../product.entity";
import { Size } from "../../size/size.entity";
import { BaseDto } from "../../config/base.dto";
import { isNotEmpty } from "class-validator";

export class ProductsSizesDto extends BaseDto {
  @IsNotEmpty()
  quantity!: number;

  @IsNotEmpty()
  size!: Size;

  @IsNotEmpty()
  product!: Product;
}

export class ProductsSizesDtoArr {
    @IsNotEmpty()
    sizesArrToQuery!:ProductsSizesDto[]
}
