const mongoose = require('mongoose')
const Users = require('../models/Users')
const Events = require('../models/Events')
const Activity = require('../models/Activity')

// Connect to Database
mongoose.connect('mongodb://localhost/volunteer-app')
  // mongoose.connect('mongodb://heroku_jqv0scnw:lo6hl1ut9k1s0tgg92vup1gum9@ds151530.mlab.com:51530/heroku_jqv0scnw')
  .then(() => {
    console.log('connected to mongoDB')
  })
  .catch((err) => {
    console.log('ERROR', err)
  })


Users.remove()
  .then(() => {
    const activity1 = new Activity({
        name: "Paint Bathroom",
        description: "Paint bathroom blue 2 coats",
        location: "3rd grade boys bathroom",
        supplies: "Blue paint, Paint brushes, Paint trays ",
        contact: "Mrs. Jones 3rd Grade Teacher",
        hours: 5
      })
      const activity2 = new Activity({
        name: "Paint Bathroom",
        description: "Paint bathroom pink 2 coats",
        location: "3rd grade girls bathroom",
        supplies: "Pink paint, Paint brushes, Paint trays ",
        contact: "Mrs. Jones 3rd Grade Teacher",
        hours: 5
      })
    const event1 = new Events({
        name: "Roswell Elementary School",
        description: "Painting Bathrooms",
        location: "Roswell Elementary School 12 Roswell Rd, Roswell",
        startDate: 8/1/2018,
        endDate: 8/1/2018,
        contact: "Principal Curry",
        attended: Boolean,
        activities: [activity1, activity2]
    })

    const event2 = new Events({
        name: "Roswell Elementary School",
        description: "Painting Bathrooms",
        location: "Roswell Elementary School 12 Roswell Rd, Roswell",
        startDate: 8/2/2018,
        endDate: 8/2/2018,
        contact: "Assistant Principal Vince",
        attended: Boolean,
        activities: [activity1, activity2]
    })

  
    const user1 = new Users({
        name: "George Of Jungle",
        age: 27,
        email: "george@jungle.congo",
        phone: 8002221000,
        contactMethod: "email",
        photo: "https://cdn.traileraddict.com/vidquad/walt-disney-pictures/george_of_the_jungle/1.jpg",
        totalHours: 0,
        events: [event1, event2]
    })
   

    const usersArry = [ user1 ]

    // save test data
    return Users.insertMany(usersArry)
  })
  .then(() => {

    // close the database
    mongoose.connection.close()
  })