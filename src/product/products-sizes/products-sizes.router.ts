import { BaseRouter } from "../../router/router";
import { ProductsSizesController } from "./products-sizes.controller";
import { ProductsSizesMiddleware } from "./products-sizes.middleware";

export class ProductsSizesRouter extends BaseRouter<
  ProductsSizesController,
  ProductsSizesMiddleware
> {
  constructor() {
    super(ProductsSizesController, ProductsSizesMiddleware);
  }
  routes(): void {
    this.router
      .get("/productsSizes", (req, res) => this.controller.getAll(req, res))
      .get("/productsSizes/:id", (req, res) =>
        this.controller.get(req, res)
      )
      .post(
        "/productsSizes",
        (req, res, next) => [
          this.middleware.validateProductsSizes(req, res, next),
        ],
        (req, res) => this.controller.create(req, res)
      )
      .put("/productsSizes/:id", (req, res) =>
        this.controller.update(req, res)
      )
      .delete("/productsSizes/:id", (req, res) =>
        this.controller.delete(req, res)
      );
  }
}
