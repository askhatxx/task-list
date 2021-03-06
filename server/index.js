const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/tasks', tasksRoutes);

const clientDir = path.join(__dirname, '..', 'client', 'build');

app.use('/', express.static(clientDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

const CONNECTION_URL = 'mongodb+srv://user01:user01@cluster0.ty15q.mongodb.net/tasks';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
  .catch(error => console.log(error));