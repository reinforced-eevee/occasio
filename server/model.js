const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    ignoreUndefined: true,
    dbName: 'occasio',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    events: [{}]
  });

const User = mongoose.model('User', userSchema);

const eventSchema = new Schema({
    name: { type: String, required: true},
    date: {type: Date},
    type: {type: String},
    size: {type: Number},
    ageRange: {type: String},
    location: {type: String},
    theme: {type: String},
    venues: [{
        name: {type: String},
        address: {type: String},
    }],
    activities: [{
        time: {type: Date},
        description: {type: String},
    }],
    playlist: [{
        title: {type: String},
        artist: {type: String},
        link: {type: String},
    }],
    shoppingList: [{
        name: {type: String},
        quantity: {type: Number},
        totalCost: {type: Number},
    }]
  });
  
const Event = mongoose.model('Event', eventSchema);

const sessionSchema = new Schema({
cookieID: { type: String, required: true, unique: true },
createdAt: { type: Date, expires: 86400, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = { User, Event, Session };