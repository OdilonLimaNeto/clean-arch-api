import { Request, Response, Router } from "express";

export default (router: Router): void => {
  router.post('/content', (request: Request, response: Response) => {
    response.json({ ok: 'ok' });
  })
}