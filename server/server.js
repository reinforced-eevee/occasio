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

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:8080'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Reflect the request origin, as credentials are included
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const openaiRoutes = require('./routes/openaiRoutes.js');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// app.get('/serverTest', (req, res) => {
//   res.json({response: 'Hey buddy, I exist =)'})
// });

app.use('/openai', openaiRoutes);
app.use('/events', eventRouter);

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

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errObj = Object.assign(defaultErr, err);
  console.log(errObj)
  // res.status(errObj.status).res.json(errObj.message);
  // res.json(errObj.message);
});

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send({ error: err });
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
