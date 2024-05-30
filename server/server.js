const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/action/getUser', userController.getUser, (req, res) => {
    res.json(res.locals.user);
});

app.post(
    '/action/login',
    userController.verifyUser,
    cookieController.setSSIDCookie,
    sessionController.startSession,
    (req, res) => {
        res.json(res.locals.authenticate);
    }
);

app.post(
    '/action/signup',
    userController.createUser,
    cookieController.setSSIDCookie,
    sessionController.startSession,
    (req, res) => {
      res.json(res.locals.user);
    }
  );


app.get(
    '/action/checkDuplicate/:email',
    userController.checkDuplicate,
    (req, res) => {
      res.json(res.locals.duplicate);
    }
  );

  app.get('/action/auth', sessionController.isLoggedIn, (req, res) => {
    res.status(200).json(true);
  });

  app.get('/action/logout', sessionController.endSession, (req, res) => {
    res.clearCookie('ssid');
    res.redirect('/');
  });

  module.exports = app;
