// import { number, array, validate } from 'joi';
import joi from 'joi';
import orders from './orders';

const newOrder = (req, res) => {
  const schema = {
    userId: joi.number().integer().required(),
    food: joi.array().required(),
  };

  const { error } = joi.validate(req.body, schema);
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
  return res.status(201).json(order); // am I supposed to redirect here?
};

export default newOrder;
