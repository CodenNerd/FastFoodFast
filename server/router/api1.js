import { Router, json } from 'express';
import { json as _json, urlencoded } from 'body-parser';
import orders, { find } from '../data/orders';
import newOrder from '../data/newOrder';
import updateOrder from '../data/updateOrder';


const api = Router();
api.use(json());
api.use(_json());
api.use(urlencoded({ extended: false }));

api.get('/orders', (req, res) => {
  res.status(200).send(orders);
});

api.get('/orders/:id', (req, res) => {
  const thisOrder = find(o => o.orderId === Number(req.params.id));
  if (!thisOrder) res.status(404).send('That particular order was not found on our server');

  res.status(200).send(thisOrder);
});

api.post('/orders', newOrder);

api.put('/orders/:id', updateOrder);

export default api;
