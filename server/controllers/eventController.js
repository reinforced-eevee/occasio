const { User, Event } = require('../models/model.js');

const eventController = {};

// controller to get all events tagged to user
eventController.getEvents = async (req, res, next) => {
    try {
        const userID = req.cookies.ssid;
        const user = await User.findOne({ _id: userID});
        res.locals.events = user ? user.events : [];
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
    console.log('addEVent running, userID is ' + userID)
    // update fields
    const {
        name,
        date,
        days,
        type,
        guest_size,
        age_range,
        location,
        theme,
        formality,
        budget,
        // venues,
        // activities,
        // playlist,
        // shoppingList
      } = req.body;

      console.log('name is ' + name);
      const {
        venues,
        activities,
        playlist,
        shoppingList
      } = res.locals.fullEvent;

      console.log('venues are ' + venues);

    //   console.log(res.locals.fullEvent);
    try {
        // update fields
        const event = await Event.create({ name, date, type, guest_size, age_range, location, theme, formality, budget, venues, activities, playlist, shoppingList});
        console.log('event created: ' + event.name);
        const user = await User.findOne({ _id: userID});
        console.log('user found: ' + user.email)
        if (!user.events) user.events = []
        user.events.push(event);
        await user.save();
        console.log('user saved');
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
