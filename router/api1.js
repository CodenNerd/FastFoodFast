const express = require('express');
const orders = require('../data/orders');

const api = express.Router();

api.get('/orders', (req, res) =>{
    res.status(200).send(orders);
})

module.exports = api;