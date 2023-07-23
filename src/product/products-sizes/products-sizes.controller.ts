import { Request, Response } from "express";
import { ResponseHttp } from "../../config/responses.http";
import { ProductsSizesService } from "./products-sizes.service";

export class ProductsSizesController {
  constructor(
    private readonly productsSizesService: ProductsSizesService = new ProductsSizesService(),
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {}

  async getAll(req: Request, res: Response) {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const limit = req.query.limit ? Number(req.query.limit) : 15;
      const productsSizes =
        await this.productsSizesService.findAllProductsSizes(skip, limit);
      if (productsSizes.length < 1)
        return this.responseHttp.notFound(res, "Not Found", " Not Found");
      this.responseHttp.oK(res, productsSizes);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const productsSizes =
        await this.productsSizesService.findProductsSizesById(id);
      if (!productsSizes)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, productsSizes);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async create(req: Request, res: Response) {
    try {
      const newProductsSizes =
        await this.productsSizesService.createProductsSizes(req.body);
      this.responseHttp.created(res, newProductsSizes);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const responseUpdate =
        await this.productsSizesService.updateProductsSizes(id, req.body);
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
      const responseDelete =
        await this.productsSizesService.deleteProductsSizes(id);
      if (responseDelete.affected == 0)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, responseDelete);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
}
