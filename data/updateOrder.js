const Joi = require('joi');
const orders = require('./orders');

const updateOrder = (req, res) => {
  // Check that the request exists
  const thisOrder = orders.find(o => o.orderId === Number(req.params.id));
  if (!thisOrder) return res.status(404).send('That particular order was not found on our server');

  // Validation of input
  const schema = {
    food: Joi.string().required(),
    foodstatus: Joi.string().required(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);

  // Success response
  thisOrder.food = req.body.food;
  thisOrder.foodstatus = req.body.foodstatus;
  return res.status(200).send(thisOrder);
};

module.exports = updateOrder;
