import cors from 'cors';
import express, { json } from 'express';
import 'express-async-errors';

import router from './routes/router';
import { errorHandler } from './middlewares/errorHandlerMiddleware';

const app = express();

app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandler);

export default app;
