const {body} = require('express-validator');

exports.loginValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({min:6}).withMessage('Password min length 6')
];

exports.registerValidator = [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({min:8}).withMessage('Password min length 8'),
  body('role').optional().isIn(['Employee','Admin']).withMessage('Invalid role')
];

