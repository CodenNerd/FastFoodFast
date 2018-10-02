import orders from './orders';

const getOrders = (req, res) => {
  res.status(200).send(orders);
};
export default getOrders;
