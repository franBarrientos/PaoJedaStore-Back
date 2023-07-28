import { Request, Response } from "express";
import { ResponseHttp } from "../config/responses.http";
import { SizeService } from "./size.service";

export class SizeController {
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp(),
    private readonly sizeService: SizeService = new SizeService(),
  ) {}

  async getAll(req: Request, res: Response) {
    try {
      const sizes = await this.sizeService.findAllSize();
      if (sizes.length < 1)
        return this.responseHttp.notFound(res, "Not Found", " Not Found");
      this.responseHttp.oK(res, [
        ...sizes
      ]);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const purchase = await this.sizeService.findSizeById(id);
      if (!purchase)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, purchase);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newSize = await this.sizeService.createSize(req.body);
      this.responseHttp.created(res, newSize);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const responseUpdate = await this.sizeService.updateSize(id, req.body);
      if (responseUpdate.affected == 0)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, responseUpdate);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const responseDelete = await this.sizeService.deleteSize(id);
      if (responseDelete.affected == 0)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, responseDelete);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
}
