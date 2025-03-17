const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, removeCartItem } = require('../controller/CartController');

router.route('/')
    .get(getCartItems)
    .post(addToCart);

router.delete('/:id', removeCartItem);

module.exports = router;