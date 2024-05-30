const { User, Event } = require('../models/model.js');

const eventController = {};

// controller to get all events tagged to user
eventController.getEvents = async (req, res, next) => {
    const userID = req.cookies.ssid;

    try {
        const user = await User.findOne({ _id: userID});
        res.locals.events = user.events;
        return next();
    } catch (error) {
        return next({
            log: 'Error in eventController.getEvents',
            status: 400,
            message: {err: 'Error getting events'}
        })
    }
}

// controller to get info for a single event
eventController.getEvent = async (req, res, next) => {
    const eventID = req.params.eventID;

    try {
        const user = await User.findOne({ _id: userID});
        res.locals.events = user.events;
        return next();
    } catch (error) {
        return next({
            log: 'Error in eventController.getEvents',
            status: 400,
            message: {err: 'Error getting events'}
        })
    }
}

module.exports = eventController;