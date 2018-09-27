import orders from './orders';
import Validator from '../Validator/Validator';

const newOrder = (req, res) => {
  Validator(req.body.userId, ['integer', 'required'], res);
  Validator(req.body.food, ['object', 'required'], res);
  Validator(req.body.food.foodname, ['string', 'required'], res);
  Validator(req.body.food.quantity, ['integer', 'required'], res);
  Validator(req.body.food.price, ['number', 'required'], res);

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
