const Schema = require('mongoose').Schema

const userSchema = new Schema ({
    name: String,
    age: Number,
    email: String,
    phone: Number,
    contactMethod: String,
    photo: String,
    totalHours: Number,
    events: []
})

module.exports = userSchema