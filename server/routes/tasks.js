const { Router } = require('express');
const taskModel = require('../models/task');

const router = Router();

router.get('/', async (req, res) => {
  const tasks = await taskModel.find();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  console.log('req.body------->3', req.body);
  const tasks = new taskModel({ title: req.body.title });
  
  try {
    await tasks.save();
    res.status(201).json(tasks);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

module.exports = router;