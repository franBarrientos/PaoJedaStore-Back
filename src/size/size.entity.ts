import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { ProductsSizes } from "../product/products-sizes/products-sizes.entity";
import { PurchasesProducts } from "../purchase/purchases-products.entity";
export enum sizesType {
  UNICO = "UNICO",
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  NUMERO_24 = "24",
  NUMERO_26 = "26",
  NUMERO_28 = "28",
  NUMERO_30 = "30",
  NUMERO_32 = "32",
  NUMERO_34 = "34",
  NUMERO_36 = "36",
  NUMERO_38 = "38",
  NUMERO_40 = "40",
  NUMERO_42 = "42",
  NUMERO_44 = "44",
  NUMERO_46 = "46",
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
