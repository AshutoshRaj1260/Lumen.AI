const express = require('express');
const { websiteAnalyzerController } = require('../controllers/analyzer.controller');
const identifyUser = require('../middlewares/auth.middleware');


const analyzerRouter = express.Router();

analyzerRouter.post('/website', identifyUser, websiteAnalyzerController);

module.exports = analyzerRouter;