const express = require('express');
const socketController = require('../sockets/controller');

const router = express.Router();

router.get('/klk', socketController.klk);
module.exports = router;