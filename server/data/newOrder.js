import { number, array, validate } from 'joi';
import { length, push } from './orders';

const newOrder = (req, res) => {
  const schema = {
    userId: number().integer().required(),
    food: array().required(),
  };

  const { error } = validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);

  const d = new Date();
  const order = {
    orderId: length + 1,
    userId: req.body.userId,
    food: req.body.food,
    foodstatus: 'pending',
    date: `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`,
    time: `${d.getHours()}:${d.getMinutes()}`,
  };

  push(order);
  return res.status(201).send(order); // am I supposed to redirect here?
};

export default newOrder;
