import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import thingRouter from './router/thing';
import attributeRouter from './router/attribute';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/things', thingRouter);
app.use('/api/attributes', attributeRouter);

export default app;
