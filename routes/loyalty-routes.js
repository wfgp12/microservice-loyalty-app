const express = require('express');
const { createLoyaltyPointController } = require('../controllers/loyalty-controller');
const LoyaltyRouter = express.Router();

LoyaltyRouter.post('/create', createLoyaltyPointController);

module.exports = LoyaltyRouter;
