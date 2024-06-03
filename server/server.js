const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { tubaMetricRouter } = require('tuba-tracing');
const promClient = require('prom-client');

const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');

const eventRouter = require('./routes/eventRouter.js');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const openaiRoutes = require('./routes/openaiRoutes.js');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src', 'index.html'));
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

  // Expose metrics endpoint for Prometheus to scrape
  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.send( await promClient.register.metrics());
  }); 

  // Global Error Handler
  app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };

    // TUBA error metrics and parsing
    tubaMetricRouter(err, "the name of your service");

    const errObj = Object.assign(defaultErr, err);
    console.log(errObj.log)
    // res.status(errObj.status).res.json(errObj.message);
    // res.json(errObj.message);
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });

  module.exports = app;
