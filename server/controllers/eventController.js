const { User, Event } = require('../model.js');

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
    const eventID = req.params.eventID;
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
        budget,
        venues,
        activities,
        playlist,
        shoppingList
      } = req.body;

    try {
        // update fields
        const event = await Event.create({ name, date, type, guest_size, age_range, location, theme, formality, budget, venues, activities, playlist, shoppingList});
        const user = await User.findOne({ _id: userID});

        if (!user.events) user.events = []
        user.events.push(event);
        res.locals.eventID = event._id;
        return next();
    } catch (error) {
        return next({
            log: 'Error in eventController.addEvent',
            status: 400,
            message: {err: 'Error adding event information'}
        })
    }
}

module.exports = eventController;