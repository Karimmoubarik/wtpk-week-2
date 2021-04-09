'use strict';
const express = require('express');
const https = require('https');
const fs = require('fs');
const http = require('http');
const app = express();
const port = 3000;
const passport = require('./utils/pass.js');
const catRouter = require('./routes/catRoute');
const rootRoute = require('./routes/rootRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
var cors = require('cors');

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

const options = {
  key: sslkey,
  cert: sslcert
}

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(__dirname + "/uploads"));
app.use('/cat', passport.authenticate('jwt', {session: false}), catRouter)
app.use('/', rootRoute)
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute)
app.use('/auth', authRoute);

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));

https.createServer(options, app).listen(8000);

http.createServer((req, res) => {
  res.writeHead(301, {'Location': 'https://localhost:8000'+req.url});
  res.end();
}).listen(3000);