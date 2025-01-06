const Task = require('../models/Task');
const wrap = require('express-async-wrapper');
const  CustomError  = require('../errors/error')


const getAllTasks = wrap(async (req, res, next) => {

  const tasks = await Task.find({});
  res.status(200).json({ tasks });

})

const getTask = wrap(async (req, res, next) => {

  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(new CustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json(task);
})

const createTask = wrap(async (req, res, next) => {

  const task = await Task.create(req.body);
  res.status(201).json(task);
});

const deleteTask = wrap(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(new CustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ msg: 'Task deleted' });
});

const updateTask = wrap(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true
  });
  if (!task) {
    return next(new CustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});



module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask

};