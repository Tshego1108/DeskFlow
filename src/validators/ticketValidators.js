const {body} = require('express-validator');

exports.createTicketValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required')
];

exports.updateStatusValidator = [
  body('status').isIn(['Open','In Progress','Resolved']).withMessage('Invalid status')
];
