import orders from './orders';
import Validator from '../Validator/Validator';

const updateOrder = (req, res) => {
  // Check that the request exists
  const thisOrder = orders.find(o => o.orderId === Number(req.params.id));
  if (!thisOrder) return res.status(404).send('That particular order was not found on our server');

  // Validation of input
  if (req.body.food === undefined && req.body.foodstatus === undefined) {
    res.status(400).send('Values not provided');
  }
  if (req.body.food) {
    if (Validator(req.body.food, ['object'], res) === true, 'food') {
      Validator(req.body.food.foodname, ['string'], res, 'foodname');
      Validator(req.body.food.quantity, ['integer'], res, 'quantity');
      Validator(req.body.food.price, ['number'], res, 'price');
    }
    thisOrder.food = req.body.food;
  }
  if (req.body.foodstatus) {
    Validator(req.body.foodstatus, ['string'], res, 'foodstatus');
    thisOrder.foodstatus = req.body.foodstatus;
  }


  // Success response

  return res.status(202).send(thisOrder);
};

export default updateOrder;
