import express from 'express';
import { prisma } from './database';
import { routes } from './routes';

const connectionDatabase = async () => {
  await prisma.$connect();
}

connectionDatabase();

const app = express();

app.use(express.json());
app.use(routes);

export { app };

