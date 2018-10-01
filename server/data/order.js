import orders from './orders';
import responses from './responses';

const order = (req, res) => {
  const thisOrder = orders.find(o => o.orderId === Number(req.params.id));
  if (!thisOrder) res.status(404).send(responses.ordernotfound);

  res.status(200).send(thisOrder);
};

export default order;
