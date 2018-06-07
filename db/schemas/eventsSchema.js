const Schema = require('mongoose').Schema

const eventsSchema = new Schema({
    name: String,
    description: String,
    location: String,
    startDate: Date,
    endDate: Date,
    contact: String,
    attended: Boolean,
    activities: []
})

module.exports = eventsSchema