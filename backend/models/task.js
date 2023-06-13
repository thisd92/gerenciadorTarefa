const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    toDo: { type: Boolean },
    isInProgress: { type: Boolean },
    isFinished: { type: Boolean },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;