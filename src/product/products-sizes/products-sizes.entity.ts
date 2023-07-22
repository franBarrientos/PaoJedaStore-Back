import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Product } from "../product.entity";
import { Size } from "../../size/size.entity";
import { BaseEntity } from "../../config/base.entity";

@Entity()
export class ProductsSizes extends BaseEntity {
  @Column()
  quantity!: number;

  @ManyToOne(() => Size, (size) => size.productsSizes)
  @JoinColumn()
  size!: Size;

  @ManyToOne(() => Product, (product) => product.productsSizes)
  @JoinColumn()
  product!: Product;
}
