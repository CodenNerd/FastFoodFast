import express from 'express';
import { json, urlencoded } from 'body-parser';
import apiVersion1 from './router/api1';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/api/v1', apiVersion1);

const responses = {
  welcome: 'Welcome to FastFoodFast',
  notfound: 'Oops! That page was not found on our server. Use a different route. Error is 404',
};

app.get('/', (req, res) => {
  res.send(responses.welcome);
});

app.use((req, res) => {
  res.status(404).send(responses.notfound);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
