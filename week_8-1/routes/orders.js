const express = require('express');
const router = express.Router();

const { order, getOrders, getOrderDetail } = require('../controller/OrderController');

router.route('/')
    .get(getOrders)
    .post(order);

router.get('/:id', getOrderDetail);

module.exports = router;