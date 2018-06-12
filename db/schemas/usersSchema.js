const Schema = require('mongoose').Schema
const eventsSchema = require('./eventsSchema')

const userSchema = new Schema ({
    name: String,
    age: Number,
    email: String,
    phone: Number,
    contactMethod: String,
    photo: String,
    totalHours: Number,
    events: [eventsSchema]
})

module.exports = userSchema