const { User, Event } = require('../model.js');

const eventController = {};

// controller to get all events tagged to user
eventController.getEvents = async (req, res, next) => {
    console.log("event controller get events running")
    try {
        const userID = req.cookies.ssid;
        const user = await User.findOne({ _id: userID});
        res.locals.events = user ? user.events : [];
        console.log(res.locals.events);
        return next();
    } catch (error) {
        return next({
            log: 'Error in eventController.getEvents',
            status: 400,
            message: {err: 'Error getting events' + error.message}
        })
    }
}

// controller to get info for a single event
eventController.getEvent = async (req, res, next) => {
    const eventID = req.params.eventID;
    try {
        const event = await Event.findOne({ _id: eventID});
        res.locals.event = event;
        return next();
    } catch (error) {
        return next({
            log: 'Error in eventController.getEvent',
            status: 400,
            message: {err: 'Error getting event information'}
        })
    }
}

// controller to post info after getting api data
eventController.addEvent = async (req, res, next) => {
    const userID = req.cookies.ssid;
    // update fields
    const {
        name,
        date,
        type,
        guest_size,
        age_range,
        location,
        theme,
        formality,
        budget
      } = req.body;
    try {
        // update fields
        const event = await Event.create({ name, date, type, guest_size, age_range, location, theme, formality, budget});
        const user = await User.findOne({ _id: userID});
        if (!user.events) user.events = []
        user.events.push(event);
        await user.save();
        res.locals.eventID = event._id;
        return next();
    } catch (error) {
        return next({
            log: 'Error in eventController.addEvent',
            status: 400,
            message: {err: 'Error adding event information: ' + error.message}
        })
    }
}

module.exports = eventController;
