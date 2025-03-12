const express = require('express');
const router = express.Router();

const { allBooks, bookDetail } = require('../controller/BookController');

router.get('/', allBooks);
router.get('/:id', bookDetail);

module.exports = router;