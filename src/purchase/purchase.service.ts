import { DeleteResult, Like, SelectQueryBuilder, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { PurchaseDto } from "./purchase.dto";
import { Purchase } from "./purchase.entity";

export class PurchaseService extends BaseService<Purchase> {
  constructor() {
    super(Purchase);
  }

  public async findAllPurchases(
    skip: number,
    limit: number
  ): Promise<[Purchase[], number]> {
    return (await this.repository).findAndCount({
      relations: [
        "customer",
        "customer.user",
        "purchasesProducts",
        "purchasesProducts.product",
        "purchasesProducts.size",
      ],
      select: {
        customer: {
          id: true,
          dni: true,
          addres: true,
          user: {
            firstName: true,
            email: true,
          },
        },
        purchasesProducts: {
          id: true,
          product: {
            name: true,
          },
          size: {
            name: true,
          },
          quantity: true,
          totalPrice: true,
        },
      },
      skip,
      take: limit,
      order: {
        id: "DESC",
      },
    });
  }

  public async findPurchaseById(id: number): Promise<Purchase | null> {
    return (await this.repository).findOne({
      where: { id },
      relations: {
        customer: true,
        purchasesProducts:{
          product:true,
          size:true
        },
      },
      select: {
        customer: {
          id: true,
          dni: true,
          addres: true,
          phone:true
        },
        purchasesProducts: {
          id: true,
          product: {
            id: true,
            name: true,
          },
          size:{
            name:true
          },
          quantity: true,
          totalPrice: true,
        },
      },
    });
  }

  public async findPurchaseByCustomerId(
    id: number
  ): Promise<Purchase[] | null> {
    return (await this.repository).find({
      where: {
        customer: {
          id,
        },
      },
      relations: [
        "customer",
        "purchasesProducts",
        "purchasesProducts.product",
        "purchasesProducts.size",
      ],
      select: {
        customer: {
          id: true,
          dni: true,
          addres: true,
        },
        purchasesProducts: {
          id: true,
          product: {
            name: true,
          },
          size: {
            name: true,
          },
          quantity: true,
          totalPrice: true,
        },
      },
    });
  }
  public async findByName(
    skip: number,
    limit: number,
    name: string
  ): Promise<[Purchase[], number]> {
    const dni = !isNaN(Number(name)) ? Number(name) : null;
    const queryBuilder = (await this.repository)
      .createQueryBuilder("purchase")
      .leftJoin("purchase.customer", "customer")
      .leftJoin("customer.user", "user")
      .leftJoin("purchase.purchasesProducts", "purchasesProducts")
      .leftJoin("purchasesProducts.product", "product")
      .leftJoin("purchasesProducts.size", "size")
      .addSelect([
        "state",
        "payment",
        "customer.id",
        "customer.addres",
        "customer.dni",
        "customer.phone",
        "user.firstName",
        "user.email",
        "purchasesProducts.id",
        "purchasesProducts.quantity",
        "purchasesProducts.totalPrice",
        "product.name",
        "size.name",
      ])
      .where("user.firstName LIKE :name", { name: `%${name}%` })
      .orWhere("user.email LIKE :email", { email: `%${name}%` });
    if (dni !== null) {
      queryBuilder.orWhere("customer.dni = :dni", { dni });
    }
    return queryBuilder.take(limit).skip(skip).getManyAndCount();
  }

  public async getProductsMostSales(): Promise<any[]> {
    return (await this.repository)
      .createQueryBuilder("purchase")
      .leftJoinAndSelect("purchase.purchasesProducts", "purchasesProducts")
      .leftJoinAndSelect("purchasesProducts.product", "product")
      .select("product.name", "productName")
      .addSelect("SUM(purchasesProducts.quantity)", "totalQuantity")
      .groupBy("product.name")
      .orderBy("totalQuantity", "DESC")
      .limit(5) // Limitar a los 5 productos más vendidos
      .getRawMany();
  }

  // Limitar a la categoría más vendida

  public async createPurchase(body: PurchaseDto): Promise<Purchase> {
    return (await this.repository).save(body);
  }

  public async deletePurchase(id: number): Promise<DeleteResult> {
    return (await this.repository).delete(id);
  }

  public async updatePurchase(
    id: number,
    infoUpdate: PurchaseDto
  ): Promise<UpdateResult> {
    return (await this.repository).update(id, infoUpdate);
  }
}
