'use strict';
const express = require('express');
const app = express();
const port = 3000;

app.get('/cat', (req, res) => {
  res.send('From this endpoint you can get cats.')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


app.PUT(port, () => console.log(`With this endpoint you can edit cats. ${port}`));

app.DELETE(port, () => console.log(`With this endpoint you can delete cats. ${port}`));