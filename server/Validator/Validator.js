const validateAs = (item, datatype, itemname) => {
  switch (datatype) {
    case 'required':
      if (!item) {
        return {
          errormessage: `${itemname} is required`,
          status: false,
        };
      }
      break;
    case 'number':
      if (typeof item !== 'number') {
        return {
          errormessage: `${itemname} should be a number`,
          status: false,
        };
      }
      break;
    case 'integer':
      if (item !== Math.floor(item) || item !== Math.ceil(item)) {
        return {
          errormessage: `${itemname} should be an integer`,
          status: false,
        };
      }
      break;
    case 'array':
      if (!item.isArray()) {
        return {
          errormessage: `${itemname} should be an array`,
          status: false,
        };
      }
      break;
    case 'string':
      if (typeof item !== 'string') {
        return {
          errormessage: `${itemname} should be a string`,
          status: false,
        };
      }
      break;
    case 'object':
      if (typeof item !== 'object') {
        return {
          errormessage: `${itemname} should be an object`,
          status: false,
        };
      }
      break;
    default:
      return {
        errormessage: `cannot resolve schema of ${itemname}`,
        status: false,
      };
  }
  return true;
};
const Validator = (item, conditions, resParam = 'res', itemname) => {
  for (let i = 0; i < conditions.length; i += 1) {
    const result = validateAs(item, conditions[i], itemname);
    if (result.status === false) {
      if (resParam === 'none') return false;
      return resParam.status(400).json(result);
    }
  }
  return true;
};

export default Validator;
