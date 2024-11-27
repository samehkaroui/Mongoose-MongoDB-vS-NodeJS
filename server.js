const express = require('express');
const app = express();
const persone = require('./app.js');
const PORT = 3000;
app.use(express.json ());

app.listen(PORT, () => {
    console.log (`http://localhost:${PORT}`);
});