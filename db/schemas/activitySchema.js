const Schema = require('mongoose').Schema
const activitySchema = new Schema ({
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
    supplies: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
})

module.exports = activitySchema