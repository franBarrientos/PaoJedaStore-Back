import { NextFunction, Request, Response } from "express";
import { ResponseHttp } from "../config/responses.http";
import { validate } from "class-validator";
import { AuthMiddleware } from "../auth/auth.middleware";
import { SizeDto } from "./size.dto";

export class SizeMiddleware extends AuthMiddleware {
  constructor(
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {
    super()
  }
  validateUser(req: Request, res: Response, next: NextFunction) {
    const { name, description } = req.body;
    const size = new SizeDto();
    size.name = name;
    size.description = description;

    validate(size).then((err) => {
      if (err.length > 0) {
        return this.responseHttp.error(res, err);
      } else {
        next();
      }
    });
  }
}
