import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { Category } from "./category.entity";
import { CategoryDto } from "./category.dto";

export class CategoryService extends BaseService<Category> {
  constructor() {
    super(Category);
  }

  public async findAllCategories(
    isAdmin: boolean = false
  ): Promise<Category[]> {
    let where;
    if (!isAdmin) {
      where = {
        state: true,
      };
    } else {
      where = {};
    }

    return (await this.repository).find({
      where,
    });
  }

  public async findCategoryById(
    id: number,
    isAdmin: boolean = false
  ): Promise<Category | null> {
    let where;
    if (!isAdmin) {
      where = {
        state: true,
        id,
      };
    } else {
      where = {
        id,
      };
    }
    return (await this.repository).findOne({
      where,
    });
  }

  public async createCategory(body: CategoryDto): Promise<Category> {
    return (await this.repository).save(body);
  }

  public async deleteCategory(id: number): Promise<DeleteResult> {
    return (await this.repository).delete(id);
  }

  public async updateCategory(
    id: number,
    infoUpdate: CategoryDto
  ): Promise<UpdateResult> {
    return (await this.repository).update(id, infoUpdate);
  }
}
