const express = require('express');
const bodyParser = require('body-parser');
const apiVersion1 = require('./router/api1.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', apiVersion1);

app.get('/', (req, res) => {
  res.send('Welcome to FastFoodFast');
});

const port = process.env.PORT || 3000;
app.listen(port);

module.exports = app;
