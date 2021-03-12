'use strict'

var express = require('express');
var DataController = require('../controllers/data.js');
var router = express.Router();

router.post('/traceability', DataController.traceability);

module.exports = router;
