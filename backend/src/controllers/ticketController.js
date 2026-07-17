const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res, next) => {
  try {
    const {title, description, priority} = req.body;
    const normalizedPriority = {
      low: 'Low',
      medium: 'Medium',
      high: 'High'
    }[String(priority || '').toLowerCase()] || priority;

    const ticket = new Ticket({title, description, priority: normalizedPriority, requester: req.user._id});
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) { next(err); }
};

exports.getMyTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({requester: req.user._id}).sort({createdAt:-1});
    res.status(200).json(tickets);
  } catch (err) { next(err); }
};

exports.getAllTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().populate('requester','name email').sort({createdAt:-1});
    res.status(200).json(tickets);
  } catch (err) { next(err); }
};

exports.updateTicketStatus = async (req, res, next) => {
  try {
    const ticketId = req.params.id;
    const {status} = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({message: 'Ticket not found'});
    ticket.status = status;
    await ticket.save();
    res.status(200).json(ticket);
  } catch (err) { next(err); }
};

exports.getTicketById = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('requester','name email');
    if (!ticket) return res.status(404).json({message: 'Ticket not found'});
    // Authorization: employees can only view their own
    if (req.user.role === 'Employee' && !ticket.requester._id.equals(req.user._id)) {
      return res.status(403).json({message: 'Forbidden'});
    }
    res.status(200).json(ticket);
  } catch (err) { next(err); }
};
