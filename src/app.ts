import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { router as thingRouter } from './thing/router';
import { router as attrRouter } from './attribute/router';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/things', thingRouter);
app.use('/attributes', attrRouter);

export default app;
