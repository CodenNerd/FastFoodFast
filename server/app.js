import express from 'express';
import { json, urlencoded } from 'body-parser';
import apiVersion1 from './router/api1';
import responses from './data/responses';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/api/v1', apiVersion1);


app.get('/', (req, res) => {
  res.send(responses.welcome);
});

app.use((req, res) => {
  res.status(404).send(responses.pagenotfound);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
