import express from 'express';
import setupMiddlewares from './midlewares';

const app = express();
setupMiddlewares(app)

export default app;