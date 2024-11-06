const { body } = require('express-validator');

const userValidationRules = {
  register: [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  login: [
    body('email').isEmail().withMessage('Please enter email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
};

module.exports = userValidationRules;