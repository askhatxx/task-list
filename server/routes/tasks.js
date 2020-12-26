const { Router } = require('express');
const taskModel = require('../models/task');

const router = Router();

router.get('/', async (req, res) => {
  console.log('get all ------->');
  try {
    const tasks = await taskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  console.log('get ------->', req.params.id);
  try {
    const task = await taskModel.findById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  console.log('add ------->', req.body);
  const newTask = new taskModel({ title: req.body.title });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  console.log('put ------->', req.params.id);
  try {
    const task = await taskModel.findById(req.params.id);
    await taskModel.findByIdAndUpdate(req.params.id, { completed: !task.completed });
    res.status(201).json({ message: 'Task updated successfully ' + req.params.id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  console.log('delete ------->', req.params.id);
  try {
    await taskModel.findByIdAndRemove(req.params.id);
    res.status(201).json({ message: 'Task deleted successfully ' + req.params.id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;