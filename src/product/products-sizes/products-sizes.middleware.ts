import { NextFunction, Request, Response } from "express";
import { ResponseHttp } from "../../config/responses.http";
import { validate } from "class-validator";
import { ProductsSizesDto } from "./products-sizes.dto";

export class ProductsSizesMiddleware {
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {}
  validateProductsSizes(req: Request, res: Response, next: NextFunction) {
    const { quantity, product, size } = req.body;
    const PurchasesProductsValidated = new ProductsSizesDto();
    PurchasesProductsValidated.product = quantity;
    PurchasesProductsValidated.quantity = quantity;
    PurchasesProductsValidated.size = size;

    validate(PurchasesProductsValidated).then((err) => {
      if (err.length > 0) {
        return this.responseHttp.error(res, err);
      } else {
        next();
      }
    });
  }
}
