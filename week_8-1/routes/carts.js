const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send('Hello World!');
    })
    .post((req, res) => {
        res.send('Hello World!');
    });

router.delete('/:bookId', (req, res) => {
    res.send('Hello World!');
});

// router.get('/carts', (req, res) => {
//     res.send('Hello World!');
// });

module.exports = router;