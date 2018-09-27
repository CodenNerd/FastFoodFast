import orders from './orders';

const validateAs = (item, datatype) => {
  switch (datatype) {
    case 'required':
      if (!item) {
        return {
          errormessage: `${item} is required`,
          status: false,
        };
      }
      break;
    case 'number':
      if (typeof item !== 'number') {
        return {
          errormessage: `${item} should be a number`,
          status: false,
        };
      }
      break;
    case 'integer':
      if (!item.isInteger()) {
        return {
          errormessage: `${item} should be an integer`,
          status: false,
        };
      }
      break;
    case 'array':
      if (!item.isArray()) {
        return {
          errormessage: `${item} should be an array`,
          status: false,
        };
      }
      break;
    case 'string':
      if (typeof item !== 'string') {
        return {
          errormessage: `${item} should be a string`,
          status: false,
        };
      }
      break;
    case 'object':
      if (typeof item !== 'object') {
        return {
          errormessage: `${item} should be an object`,
          status: false,
        };
      }
      break;
    default:
      return {
        errormessage: `cannot resolve schema of ${item}`,
        status: false,
      };
  }
  return true;
};
const Validator = (item, conditions, resParam = 'res') => {
  for (let i = 0; i < conditions.length; i += 1) {
    const result = validateAs(item, conditions[i]);
    if (result.status === false) {
      return resParam.status(400).send(result.errormessage);
    }
  }
  return true;
};

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
