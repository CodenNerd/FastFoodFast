import express from 'express';
import { json, urlencoded } from 'body-parser';
import apiVersion1 from './router/api1';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/api/v1', apiVersion1);

app.get('/', (req, res) => {
  res.send('Welcome to FastFoodFast');
});

const port = process.env.PORT || 3000;
app.listen(port);

export default app;
