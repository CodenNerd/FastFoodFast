const express = require('express');
const orders = require('../data/orders');

const api = express.Router();
api.use(express.json());

api.get('/orders', (req, res) => {
  res.status(200).send(orders);
});

api.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.orderId === Number(req.params.id));
  if (!order) res.status(404).send('That particular order was not found on our server');

  res.status(404).send(order);
});

api.post('/orders', (req, res) => {
  const d = new Date();
  const order = {
    orderId: orders.length + 1,
    userId: req.body.userId,
    food: req.body.food,
    status: 'pending',
    date: `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`,
    time: `${d.getHours()}:${d.getMinutes()}`,
  };
  orders.push(order);
  res.status(200).send(orders);
});
module.exports = api;
