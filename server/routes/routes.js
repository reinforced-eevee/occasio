const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController.js')

router.get('/', eventController.getEvents, (req, res, next) => {
    return res.status(200).json(res.locals.events)
})

module.exports = router;