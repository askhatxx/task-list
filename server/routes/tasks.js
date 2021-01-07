const { Router } = require('express');
const taskModel = require('../models/task');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await taskModel.find().sort({ date: 'desc' });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Not Found' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const newTask = new taskModel({ title: req.body.title });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await taskModel.findByIdAndUpdate(req.params.id, { completed: req.body.completed });
    res.status(201).json({ message: 'Task updated successfully ' + req.params.id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await taskModel.findByIdAndRemove(req.params.id);
    res.status(201).json({ message: 'Task deleted successfully ' + req.params.id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;