import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { Category } from "../category/category.entity";
import { PurchasesProducts } from "../purchase/purchases-products.entity";
import { ProductsSizes } from "./products-sizes/products-sizes.entity";

@Entity()
export class Product extends BaseEntity{
 
    @Column()
    name!:string
    
    @Column()
    description!:string
    
    @Column()
    img!:string
    
    @Column()
    price!:number

    @Column({default:true})
    stock?:boolean
    
    @ManyToOne(()=>Category,
    (category=>category.products))
    @JoinColumn()
    category!:Category

    @OneToMany(()=>PurchasesProducts, (purchasesProducts)=>purchasesProducts.product)
    purchasesProducts!:PurchasesProducts[]

    @OneToMany(()=>ProductsSizes, (productsSizes)=>productsSizes.product)
    productsSizes!:ProductsSizes[]
}