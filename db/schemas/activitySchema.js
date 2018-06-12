const Schema = require('mongoose').Schema
const activitySchema = new Schema ({
    name: String,
    description: String,
    location: String,
    supplies: String,
    contact: String,
    photo: String,
})

module.exports = activitySchema