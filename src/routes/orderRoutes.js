const express = require('express');
const router = express.Router();
const {getTotalMyRevenue , getTotalRevenue}= require('../controllers/orderController');
const {authenticateUser} = require('../middlewares/authenticateUser');

// Protect this route by using the authenticate middleware
router.get('/my-total-revenue', authenticateUser, getTotalMyRevenue );
router.get('/total-revenue', authenticateUser, getTotalRevenue);

module.exports = router;
