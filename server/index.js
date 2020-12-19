const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json({test:"Hello!!!"});
});

app.listen(5000, () => console.log(`Server Running on Port: ${5000}`));