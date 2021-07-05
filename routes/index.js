'use strict'
var express = require('express');
var DataController = require('../controllers/data.js');
var router = express.Router();

router.post('/traceabilityM', DataController.traceabilityM);
//router.post('/traceabilityC', DataController.traceabilityC);
//router.post('/traceabilityA', DataController.traceabilityA);
//router.post('/traceabilityP', DataController.traceabilityP);

router.post('/addData', DataController.addData);

module.exports = router;
