const express = require('express');
const router = express.Router();

router.post('/join', (req, res) => {
    res.send('Hello World!');
});

router.post('/login', (req, res) => {
    res.send('Hello World!');
});

router.post('/reset', (req, res) => {
    res.send('Hello World!');
});

router.put('/reset', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;