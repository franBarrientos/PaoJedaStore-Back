import { NextFunction, Request, Response } from "express";
import { ResponseHttp } from "../../config/responses.http";
import { validate } from "class-validator";
import { ProductsSizesDtoArr } from "./products-sizes.dto";
import { AuthMiddleware } from "../../auth/auth.middleware";

export class ProductsSizesMiddleware extends AuthMiddleware{
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {super()}
  validateProductsSizes(req: Request, res: Response, next: NextFunction) {
    const { sizesArrToQuery } = req.body;
    const PurchasesProductsValidated = new ProductsSizesDtoArr();
    PurchasesProductsValidated.sizesArrToQuery = sizesArrToQuery;
    validate(PurchasesProductsValidated).then((err) => {
      if (err.length > 0) {
        return this.responseHttp.error(res, err);
      } else {
        next();
      }
    });
  }
}
