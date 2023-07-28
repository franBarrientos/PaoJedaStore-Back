import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { Size } from "./size.entity";
import { SizeDto } from "./size.dto";

export class SizeService extends BaseService<Size> {
  constructor() {
    super(Size);
  }

  public async findAllSize(): Promise<Size[]> {
    return (await this.repository).find();
  }

  public async findSizeById(
    id: number
  ): Promise< Size | null> {
    return (await this.repository).findOne({
      where: { id },
    });
  }

  public async createSize(
    body: SizeDto
  ): Promise<Size> {
    return (await this.repository).save(body);
  }

  public async deleteSize(id: number): Promise<DeleteResult> {
    return (await this.repository).delete(id);
  }

  public async updateSize(
    id: number,
    infoUpdate: Size
  ): Promise<UpdateResult> {
    return (await this.repository).update(id, infoUpdate);
  }
}
