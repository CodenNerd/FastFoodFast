import orders from './orders';
import Validator from '../Validator/Validator';

const newOrder = (req, res) => {
  Validator(req.body.userId, ['integer', 'required'], res, 'userId');
  Validator(req.body.food, ['object', 'required'], res, 'food');
  Validator(req.body.food.foodname, ['string', 'required'], res, 'foodname');
  Validator(req.body.food.quantity, ['integer', 'required'], res, 'quantity');
  Validator(req.body.food.price, ['number', 'required'], res, 'price');

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
  return res.status(201).json(order);
};


export default newOrder;
