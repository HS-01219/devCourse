const express = require('express');
const router = express.Router();
const { addLike, removeLike } = require("../controller/LikeController");


router.route('/:bookId')
    .post(addLike)
    .delete(removeLike);

module.exports = router;