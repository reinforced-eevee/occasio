const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    ignoreUndefined: true,
    dbName: 'occasio',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    events: [{}]
  });

const User = mongoose.model('User', userSchema);

const eventSchema = new Schema({
    name: { type: String, required: true},
    date: {type: Date},
    days: {type: Number}, 
    type: {type: String, required: true},
    guest_size: {type: Number, required: true},
    age_range: {type: String},
    formality: {type: String},
    location: {type: String},
    theme: {type: String},
    budget: {type: String},
    venues: [{}],
    activities: [{}],
    playlist: [{}],
    shoppingList: [{}]
  });
  
const Event = mongoose.model('Event', eventSchema);

const sessionSchema = new Schema({
cookieID: { type: String, required: true, unique: true },
createdAt: { type: Date, expires: 86400, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = { User, Event, Session };
