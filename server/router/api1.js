import { Router, json } from 'express';
import dotenv from 'dotenv';
import jsOrders from '../data/getOrders';
import dbOrders from '../DB/controllers/orders';
import jsNewOrder from '../data/newOrder';
import dbNewOrder from '../DB/controllers/newOrder';
import jsUpdateOrder from '../data/updateOrder';
import dbUpdateOrder from '../DB/controllers/updateOrder';
import jsOrder from '../data/order';
import dbOrder from '../DB/controllers/order';
import Auth from '../DB/middleware/Auth';
import signin from '../DB/controllers/signin';
import signup from '../DB/controllers/signup';

dotenv.config();
const order = process.env.TYPE === 'db' ? dbOrder : jsOrder;
const orders = process.env.TYPE === 'db' ? dbOrders : jsOrders;
const newOrder = process.env.TYPE === 'db' ? dbNewOrder : jsNewOrder;
const updateOrder = process.env.TYPE === 'db' ? dbUpdateOrder : jsUpdateOrder;

const api = Router();
api.use(json());

api.post('/auth/login', Auth.verifyToken, signin);
api.post('/auth/signup', signup);
api.get('/orders', orders);
api.get('/orders/:id', order);
api.post('/orders', newOrder);
api.put('/orders/:id', updateOrder);

export default api;
