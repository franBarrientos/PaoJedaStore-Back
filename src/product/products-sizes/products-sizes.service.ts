import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductsSizes } from "./products-sizes.entity";
import { ProductsSizesDto } from "./products-sizes.dto";

export class ProductsSizesService extends BaseService<ProductsSizes> {
  constructor() {
    super(ProductsSizes);
  }

  public async findAllProductsSizes(
    skip: number,
    limit: number
  ): Promise<ProductsSizes[]> {
    return (await this.repository).find({
      relations: {
        size: true,
        product: true,
      },
      select: {
        size: {
          id: true,
          name: true,
        },
        product: {
          id: true,
          name: true,
          price: true,
        },
      },
      skip,
      take: limit,
    });
  }

  public async findProductsSizesById(
    id: number
  ): Promise<ProductsSizes | null> {
    return (await this.repository).findOne({
      where: { id },
      relations: {
        size: true,
        product: true,
      },
      select: {
        size: {
          id: true,
          name: true,
        },
        product: {
          id: true,
          name: true,
          price: true,
        },
      },
    });
  }

  public async createProductsSizes(
    body: ProductsSizesDto
  ): Promise<ProductsSizes> {
    return (await this.repository).save(body);
  }

  public async deleteProductsSizes(id: number): Promise<DeleteResult> {
    return (await this.repository).delete(id);
  }

  public async updateProductsSizes(
    id: number,
    infoUpdate: ProductsSizesDto
  ): Promise<UpdateResult> {
    return (await this.repository).update(id, infoUpdate);
  }
}
