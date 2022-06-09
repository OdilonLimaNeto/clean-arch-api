import { Request, Response } from 'express';
export const cors = (request: Request, response: Response, next) => {
  response.set('access-control-allow-origin', '*');
  response.set('access-control-allow-methods', '*');
  response.set('access-control-allow-headers', '*');
  next()
}