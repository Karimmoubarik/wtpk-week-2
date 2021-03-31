'use strict';
const express = require('express');
const app = express();
const port = 3000;
const catRouter = require('./routes/catRoute')

app.use(express.urlencoded({ extended: true }));
app.use('/cat', catRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
