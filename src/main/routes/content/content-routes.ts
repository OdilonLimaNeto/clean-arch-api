import { Router } from "express";
import { adapterRouterExpress } from "../../adapters/express-route-adapter";
import { makeContentController } from "../../factories/controllers/content/create-content-factory";

export default (router: Router): void => {
  router.post('/content', adapterRouterExpress(makeContentController()))
}