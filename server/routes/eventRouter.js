const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController.js')

router.get('/', eventController.getEvents, (req, res, next) => {
    return res.status(200).json(res.locals.events)
})

router.get('/:eventID', eventController.getEvent, (req, res, next) => {
    return res.status(200).json(res.locals.event)
})

router.post('/:eventID', eventController.addEvent, (req, res, next) => {
    return res.status(200).json(res.locals.eventID)
})

module.exports = router;