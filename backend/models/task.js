const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    isFinished: { type: Boolean }
})

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;