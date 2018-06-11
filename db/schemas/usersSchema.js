const Schema = require('mongoose').Schema
const eventsSchema = require('./eventsSchema')

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    age: Number,
    email: {
        type: String,
        required: true
    },
    phone: Number,
    contactMethod: String,
    photo: {
        type: String,
        default: "https://www.fillmurray.com/g/220/220"
    },
    totalHours: Number,
    events: [eventsSchema]
})

module.exports = userSchema