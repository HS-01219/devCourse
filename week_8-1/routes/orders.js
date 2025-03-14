const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send('Hello World!');
    })
    .post((req, res) => {
        res.send('Hello World!');
    });

router.get('/:orderId', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;