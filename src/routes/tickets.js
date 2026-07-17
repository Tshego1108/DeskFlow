const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/auth');
const {authorizeRoles} = require('../middleware/roles');
const ticketController = require('../controllers/ticketController');
const {createTicketValidator, updateStatusValidator} = require('../validators/ticketValidators');
const {runValidation} = require('../middleware/validate');

// Employee: create, view own, view specific
router.post('/', authenticate, createTicketValidator, runValidation, ticketController.createTicket);
router.get('/me', authenticate, ticketController.getMyTickets);
router.get('/:id', authenticate, ticketController.getTicketById);

// Admin: view all, update status
router.get('/', authenticate, authorizeRoles('Admin'), ticketController.getAllTickets);
router.patch('/:id/status', authenticate, authorizeRoles('Admin'), updateStatusValidator, runValidation, ticketController.updateTicketStatus);

module.exports = router;
