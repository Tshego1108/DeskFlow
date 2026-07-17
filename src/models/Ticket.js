const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: {type: String, required: true, trim: true},
  description: {type: String, required: true},
  status: {type: String, enum: ['Open','In Progress','Resolved']},
  priority: {type: String, enum: ['Low','Medium','High']},
  requester: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

module.exports = mongoose.model('Ticket', ticketSchema);
