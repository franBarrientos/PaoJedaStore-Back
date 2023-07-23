import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { ProductsSizes } from "../product/products-sizes/products-sizes.entity";
import { PurchasesProducts } from "../purchase/purchases-products.entity";
export enum sizesType {
  UNICO = "UNICO",
  xs = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
}

@Entity()
export class Size extends BaseEntity {
  @Column({
    type: "enum",
    enum: sizesType,
    nullable: false,
    default: sizesType.M,
  })
  name!: string;

  @Column()
  description?: string;

  @OneToMany(
    () => PurchasesProducts,
    (purchasesProducts) => purchasesProducts.size
  )
  purchasesProducts?: PurchasesProducts[];

  @OneToMany(() => ProductsSizes, (productsSizes) => productsSizes.size)
  productsSizes?: ProductsSizes[];
}
