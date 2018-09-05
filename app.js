const express = require('express');

const apiVersion1 = require('./router/api1.js');

const app = express();

app.use('/api/v1', apiVersion1);

app.get('/', (req, res) => {
  res.send('Welcome to FastFoodFast');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
