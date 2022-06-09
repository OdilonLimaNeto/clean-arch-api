import { Request, Response } from 'express';
import request from 'supertest';
import app from '../config/app';

describe('Body Parser Middleware', () => {
  it('Should parse body as json', async () => {
    app.post('/test_body_parser', (request: Request, response: Response) => {
      response.send(request.body);
    });
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'John Doe' })
      .expect({ name: 'John Doe' });
  });
})