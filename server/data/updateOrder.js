import orders from './orders';
import Validator from '../Validator/Validator';

const updateOrder = (req, res) => {
  // Check that the request exists
  const thisOrder = orders.find(o => o.orderId === Number(req.params.id));
  if (!thisOrder) return res.status(404).send('That particular order was not found on our server');

  // Validation of input

  if (Validator(req.body.food, ['object'], res) === true) {
    Validator(req.body.food.foodname, ['string', 'required'], res);
    Validator(req.body.food.quantity, ['integer', 'required'], res);
    Validator(req.body.food.price, ['number', 'required'], res);
  }
  Validator(req.body.foodstatus, ['string'], res);


  // Success response
  thisOrder.food = req.body.food;
  thisOrder.foodstatus = req.body.foodstatus;
  return res.status(200).send(thisOrder);
};

export default updateOrder;
