import { Request, Response } from "express";
import { HttpRequest } from "../../../presentation/protocols";
import Controller from "../../../presentation/protocols/controller";

export const adapterRouterExpress = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const HTTPRequest: HttpRequest = {
      body: request.body,
    };
    const HTTPResponse = await controller.handle(HTTPRequest);
    response.status(HTTPResponse.statusCode).json(HTTPResponse.body);
  };
};
