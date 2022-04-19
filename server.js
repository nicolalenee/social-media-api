// import express and mongoose orm
const express = require('express');
const mongoose = require('mongoose');

// declare app and port
const app = express();
const PORT = process.env.PORT || 3001;

// bring in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// bring in routes to server
app.use(require('./routes'));

// connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sm-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// log mongo queries that are being executed
mongoose.set('debug', true);

// rev up those fry-- I mean, servers!
app.listen(PORT, () => console.log(`🌻 Connected on localhost:${PORT}`));