import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { ProductsSizes } from "../product/products-sizes/products-sizes.entity";
export enum sizesType {
  xs = "xs",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
}

@Entity()
export class Size extends BaseEntity {
  @Column({ type: "enum", enum: sizesType, nullable: false, default: sizesType.M })
  name!: string;

  @Column()
  description?: string;

  @Column({default:true})
  stock?:boolean
  

  @OneToMany(() => ProductsSizes, (productsSizes) => productsSizes.size)
  productsSizes?: ProductsSizes[];
}
