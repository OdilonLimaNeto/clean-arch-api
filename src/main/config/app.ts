import express from 'express';
import setupMiddlewares from './midlewares';
import setupRoutes from './routes';

const app = express();
setupMiddlewares(app)
setupRoutes(app)

export default app;