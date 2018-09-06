const Joi = require('joi');
const orders = require('./orders');

const newOrder = (req, res) => {
  const schema = {
    userId: Joi.number().integer().required(),
    food: Joi.string().required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) return res.status(400).send(result.error.details[0].message);

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
  return res.status(200).send(orders);
};

module.exports = newOrder;
