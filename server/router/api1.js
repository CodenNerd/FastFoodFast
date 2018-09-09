const express = require('express');
const bodyParser = require('body-parser');
const orders = require('../data/orders');
const newOrder = require('../data/newOrder');
const updateOrder = require('../data/updateOrder');


const api = express.Router();
api.use(express.json());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

api.get('/orders', (req, res) => {
  res.status(200).send(orders);
});

api.get('/orders/:id', (req, res) => {
  const thisOrder = orders.find(o => o.orderId === Number(req.params.id));
  if (!thisOrder) res.status(404).send('That particular order was not found on our server');

  res.status(200).send(thisOrder);
});

api.post('/orders', newOrder);

api.put('/orders/:id', updateOrder);

module.exports = api;
