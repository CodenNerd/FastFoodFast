const express = require('express');
const orders = require('../data/orders');
const newOrder = require('../data/newOrder');

const api = express.Router();
api.use(express.json());

api.get('/orders', (req, res) => {
  res.status(200).send(orders);
});

api.get('/orders/:id', (req, res) => {
  const thisOrder = orders.find(o => o.orderId === Number(req.params.id));
  if (!thisOrder) res.status(404).send('That particular order was not found on our server');

  res.status(404).send(thisOrder);
});

api.post('/orders', newOrder);


module.exports = api;
