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


const newOrder = (req, res) => {
  let error = validateAs(req.body.userId, 'integer').errormessage || validateAs(req.body.userId, 'required').errormessage;
  if (error) return res.status(400).send(error);
  error = validateAs(req.body.food, 'object').errormessage || validateAs(req.body.userId, 'required').errormessage;

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
