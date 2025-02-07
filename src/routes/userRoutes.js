const express = require('express');
const {login , register ,users,userProfile} = require('../controllers/userController')
const {authenticateUser} = require('../middlewares/authenticateUser');
const { registerValidationRules, loginValidationRules }= require('../validations/userValidations')
const { validationResult } = require("express-validator");


const router = express.Router();


const validate = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }
   next();
};

router.post('/register', registerValidationRules ,validate ,register);
router.post('/login',loginValidationRules ,validate, login);
router.get('/users',authenticateUser ,users);
router.get('/profile',authenticateUser ,userProfile);


module.exports = router;