import { DeleteResult, Like, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { Product } from "./product.entity";
import { ProductDto } from "./product.dto";

export class ProductService extends BaseService<Product> {
  constructor() {
    super(Product);
  }
  public async findAllProducts(
    skip: number,
    limit: number,
    category: number
  ): Promise<[Product[], number]> {
    return (await this.repository).findAndCount({
      where: {
        category: {
          id: category,
        },
      },
      relations: ["category", "productsSizes", "productsSizes.size"],
      select: {
        category: {
          id: true,
          name: true,
        },
        productsSizes: {
          id: true,
          size: {
            name: true,
          },
          quantity: true,
        },
      },
      skip,
      take: limit,
    });
  }

  public async getProductsWithStock(
    skip: number,
    limit: number,
    category: number
  ): Promise<[Product[], number]> {
    return (await this.repository)
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.productsSizes", "productsSizes")
      .leftJoinAndSelect("productsSizes.size", "size")
      .select([
        "product.id",
        "product.name",
        "product.description",
        "product.img",
        "product.price",
        "product.stock",
        "category.id",
        "category.name",
        "productsSizes.id",
        "productsSizes.quantity",
        "size.id",
        "size.name",
      ])
      .where("product.stock = :stock", { stock: true })
      .andWhere("category.id = :category", { category })
      .andWhere("productsSizes.quantity > :quantity", { quantity: 0 })
      .getManyAndCount();
  }

  public async findByName(
    skip: number,
    limit: number,
    name: string
  ): Promise<[Product[], number]> {
    return (await this.repository).findAndCount({
      where: {
        stock: true ,
        name: Like(`%${name}%`),
      },
      relations: ["category", "productsSizes", "productsSizes.size"],
      select: {
        category: {
          id: true,
          name: true,
        },
        productsSizes: {
          id: true,
          size: {
            name: true,
          },
          quantity: true,
        },
      },
      skip,
      take: limit,
    });
  }

  public async findByNameAdmin(
    skip: number,
    limit: number,
    name: string
  ): Promise<[Product[], number]> {
    return (await this.repository).findAndCount({
      where: {
        name: Like(`%${name}%`),
      },
      relations: ["category", "productsSizes", "productsSizes.size"],
      select: {
        category: {
          id: true,
          name: true,
        },
        productsSizes: {
          id: true,
          size: {
            name: true,
          },
          quantity: true,
        },
      },
      skip,
      take: limit,
    });
  }

  public async findProductById(id: number): Promise<Product | null> {
    return (await this.repository).findOne({
      where: { id },
      relations: {
        category: true,
        productsSizes:{
          size:true
        }
      },
      select: {
        category: {
          id: true,
          name: true,
        },
        productsSizes:{
          id:true,
          size:{
            name:true
          },
          quantity:true
        }
      },
    });
  }

  public async createProduct(body: ProductDto): Promise<Product> {
    return (await this.repository).save(body);
  }

  public async deleteProduct(id: number): Promise<DeleteResult> {
    return (await this.repository).delete(id);
  }

  public async updateProduct(
    id: number,
    infoUpdate: ProductDto
  ): Promise<UpdateResult> {
    return (await this.repository).update(id, infoUpdate);
  }
}
