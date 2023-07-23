import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { Purchase } from "./purchase.entity";
import { Product } from "../product/product.entity";
import { Size } from "../size/size.entity";

@Entity()
export class PurchasesProducts extends BaseEntity {
  @Column()
  quantity!: number;

  @Column()
  totalPrice!: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchasesProducts)
  @JoinColumn()
  purchase!: Purchase;

  @ManyToOne(() => Size, (size) => size.purchasesProducts)
  size!: Size;

  @ManyToOne(() => Product, (product) => product.purchasesProducts)
  @JoinColumn()
  product!: Product;
}
