'use strict';
const express = require('express');
const app = express();
const port = 3000;
const passport = require('./utils/pass.js');
const catRouter = require('./routes/catRoute');
const rootRoute = require('./routes/rootRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
var cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(__dirname + "/uploads"));
app.use('/cat', passport.authenticate('jwt', {session: false}), catRouter)
app.use('/', rootRoute)
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute)
app.use('/auth', authRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
