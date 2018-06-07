const mongoose = require('mongoose')
const eventsSchema = require('../db/schemas/eventsSchema')

const Events = mongoose.model('event', eventsSchema)

module.exports = Events