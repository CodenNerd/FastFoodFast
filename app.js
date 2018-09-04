const express = require('express');

const apiVersion1 = require('./router/api1.js');

const app = express();

app.use('/api/v1', apiVersion1);

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`app started on port ${port}`);
});
