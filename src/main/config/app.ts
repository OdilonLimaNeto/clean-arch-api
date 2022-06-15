import express from 'express';
import setupENV from './env';
import setupMiddlewares from './midlewares';
import setupRoutes from './routes';

const app = express();
setupMiddlewares(app)
setupRoutes(app)
setupENV()

export default app;