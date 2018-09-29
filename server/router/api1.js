import { Router, json } from 'express';
import { json as _json, urlencoded } from 'body-parser';
import orders from '../data/orders';
import newOrder from '../data/newOrder';
import updateOrder from '../data/updateOrder';
import responses from '../data/responses';


const api = Router();
api.use(json());
api.use(_json());
api.use(urlencoded({ extended: false }));


api.get('/orders', (req, res) => {
  res.status(200).send(orders);
});

api.get('/orders/:id', (req, res) => {
  const thisOrder = orders.find(o => o.orderId === Number(req.params.id));
  if (!thisOrder) res.status(404).send(responses.ordernotfound);

  res.status(200).send(thisOrder);
});

api.post('/orders', newOrder);

api.put('/orders/:id', updateOrder);

export default api;
