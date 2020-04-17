'use strict';

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({exposedHeaders:'auth'}));

app.listen(4000, () => console.log('Server Up (4000)'));

const token = 'faketoken';

app.get('/login', (req,res) => {
  res.set('auth', token);
  res.status(200);
  res.send('ok');
});

app.post('/save', bearerAuth, (req,res) => {
  res.status(200).send('ok');
});

app.use( (err,req,res,next) => {
  res.status(500).send(err);
});

function bearerAuth(req,res,next) {
  let loginToken = req.headers.authorization.split(/\s+/).pop();
  if (loginToken === token) { next(); }
  else { next(`bad token: ${loginToken}`); }
}
