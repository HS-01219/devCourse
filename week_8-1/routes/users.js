const express = require('express');
const router = express.Router();

const { join, login, requestReset, passwordReset } = require("../controller/UserController");

router.post('/join', join);
router.post('/login', login);
router.post('/reset', requestReset);
router.put('/reset', passwordReset);

module.exports = router;