const { body } = require("express-validator");


const registerValidationRules = [
  
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long."),

  
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .normalizeEmail(),


  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];


const loginValidationRules = [
 
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .normalizeEmail(),


  body("password")
    .notEmpty()
    .withMessage("Password is required."),
   
];

module.exports = { registerValidationRules, loginValidationRules };


