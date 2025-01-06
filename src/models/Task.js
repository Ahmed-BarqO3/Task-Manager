const mongoess = require('mongoose');

const TaskSchema = new mongoess.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoess.model('Task', TaskSchema);