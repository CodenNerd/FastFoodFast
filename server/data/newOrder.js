const Joi = require('joi');
const orders = require('./orders');

const newOrder = (req, res) => {
  const schema = {
    userId: Joi.number().integer().required(),
    food: Joi.array().required(),
  };

  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);

  const d = new Date();
  const order = {
    orderId: orders.length + 1,
    userId: req.body.userId,
    food: req.body.food,
    foodstatus: 'pending',
    date: `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`,
    time: `${d.getHours()}:${d.getMinutes()}`,
  };

  orders.push(order);
  return res.status(201).send(order); // am I supposed to redirect here?
};

module.exports = newOrder;
