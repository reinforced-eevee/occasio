const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');

const eventRouter = require('./routes/eventRouter.js');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

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

app.use('/events', eventRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
