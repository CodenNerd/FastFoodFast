const express = require('express');
const orders = require('../data/orders');

const api = express.Router();

api.get('/orders', (req, res) =>{
    res.status(200).send(orders);
})

api.get('/orders/:id', (req, res) =>{
    const order = orders.find(o => o.orderId === parseInt(req.params.id));
    if(!order)  res.status(404).send('That paricular order was not found on our server');
    
    res.status(404).send(order);
});

module.exports = api;