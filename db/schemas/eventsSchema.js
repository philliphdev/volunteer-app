const Schema = require('mongoose').Schema
const activitySchema = require('./activitySchema')

const eventsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "http://vannw.org/wp-content/uploads/2017/04/volunteer-thanks.jpg"
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    attended: {
        type: String,
        default: "NO"
    },

    activities: [activitySchema]
})

module.exports = eventsSchema