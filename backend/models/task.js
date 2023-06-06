const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    toDo: { type: Boolean },
    isInProgress: { type: Boolean },
    isFinished: { type: Boolean }
})

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;