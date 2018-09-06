const Joi = require('joi');
const orders = require('./orders');

const newOrder = (req, res) => {
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
};

module.exports = newOrder;
