import { Router, json } from 'express';
import dotenv from 'dotenv';
import jsOrders from '../data/getOrders';
import dbOrders from '../DB/controllers/orders';
import newOrder from '../data/newOrder';
import updateOrder from '../data/updateOrder';
import jsOrder from '../data/order';
import dbOrder from '../DB/controllers/order';


dotenv.config();
const order = process.env.TYPE === 'db' ? dbOrder : jsOrder;
const orders = process.env.TYPE === 'db' ? dbOrders : jsOrders;

const api = Router();
api.use(json());

api.get('/orders', orders);

api.get('/orders/:id', order);

api.post('/orders', newOrder);

api.put('/orders/:id', updateOrder);

export default api;
