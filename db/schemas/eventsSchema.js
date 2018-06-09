const Schema = require('mongoose').Schema
const activitySchema = require('./activitySchema')

const eventsSchema = new Schema({
    name: String,
    description: String,
    location: String,
    startDate: Date,
    endDate: Date,
    contact: String,
    attended: Boolean,
    activities: [activitySchema]
})

module.exports = eventsSchema