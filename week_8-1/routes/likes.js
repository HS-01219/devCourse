const express = require('express');
const router = express.Router();


router.route('/:bookId')
    .post((req, res) => {
        res.send('Hello World!');
    })
    .delete((req, res) => {
        res.send('Hello World!');
    });

module.exports = router;