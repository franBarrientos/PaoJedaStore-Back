import { BaseRouter } from "../router/router";
import { SizeController } from "./size.controller";
import { SizeMiddleware } from "./size.middleware";

export class SizeRouter extends BaseRouter<SizeController, SizeMiddleware> {
  constructor() {
    super(SizeController, SizeMiddleware);
  }

  routes(): void {
    this.router
      .get("/size", (req, res) => this.controller.getAll(req, res))
      .get("/size/:id", (req, res) => this.controller.get(req, res))
      .post(
        "/size",
        (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
        (req, res) => this.controller.create(req, res)
      )
      .put(
        "/size/:id",
        (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
        (req, res) => this.controller.update(req, res)
      )
      .delete(
        "/size/:id",
        (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
        (req, res) => this.controller.delete(req, res)
      );
  }
}
