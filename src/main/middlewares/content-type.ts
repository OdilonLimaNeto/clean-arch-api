import { Request, Response } from "express";
export const contentType = (request: Request, response: Response, next) => {
  response.type("json");
  next();
};
