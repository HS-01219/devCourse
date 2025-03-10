const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/:bookId', (req, res) => {
    res.send('Hello World!');
});

// 쿼리 스트링 url 동일..? 위에서 같이 처리할 듯
// router.get('/', (req, res) => {
//     res.send('Hello World!');
// });

module.exports = router;