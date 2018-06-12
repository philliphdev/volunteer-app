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
      name: "Peanut Butter and Jelly Sandwich ROBOT - STEM",
      description: "Teach a ROBOT to make a PB and J",
      location: "3rd grade computer lab",
      supplies: "Almond Butter, Jelly, Bread, Plastic Knife and 1 Robot costume ",
      contact: "Mrs. Jones 3rd Grade Teacher",
      hours: 5
    })
    const activity2 = new Activity({
      name: "Math is Fun",
      description: "Math games",
      location: "3rd grade room 222 ",
      supplies: "Math Flash Cards",
      contact: "Mrs. Jones 3rd Grade Teacher",
      hours: 3
    })
    const activity3 = new Activity({
      name: "Paint Bathroom",
      description: "Paint bathroom pink 2 coats",
      location: "3rd grade girls bathroom",
      supplies: "Pink paint, Paint brushes, Paint trays ",
      contact: "Mrs. Jones 3rd Grade Teacher",
      hours: 3
    })
    const event1 = new Events({
      name: "Russell Elementary School",
      description: "STEM Projects",
      location: "Russell Elementary School 122 Ross Rd, Smyrna",
      startDate: 8 / 1 / 2018,
      endDate: 8 / 1 / 2018,
      contact: "Principal Curry",
      attended: "Yes",
      activities: [activity1, activity2]
    })
    const event2 = new Events({
      name: "Roswell Elementary School",
      description: "STEM Day",
      location: "Roswell Elementary School 12 Roswell Rd, Roswell",
      startDate: 8 / 1 / 2018,
      endDate: 8 / 1 / 2018,
      contact: "Principal Curry",
      attended: "No",
      activities: [activity1, activity2]
    })

    const event3 = new Events({
      name: "Roswell Elementary School",
      description: "Day of Caring",
      location: "Roswell Elementary School 12 Roswell Rd, Roswell",
      startDate: 8 / 2 / 2018,
      endDate: 8 / 2 / 2018,
      contact: "Assistant Principal Vince",
      attended: "Yes",
      activities: [activity3]
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

    const user2 = new Users({
      name: "Jane Of Jungle",
      age: 23,
      email: "jane@jungle.congo",
      phone: 8002221000,
      contactMethod: "email",
      photo: "http://www.cabformrsmutton.com/wp-content/uploads/2016/02/katy-roar-sm-vid.jpg",
      totalHours: 0,
      events: [event1, event2]
    })

    const user3 = new Users({
      name: "King Of Jungle",
      age: 12,
      email: "king@jungle.congo",
      phone: 8002221000,
      contactMethod: "email",
      photo: "https://www.fillmurray.com/g/220/220",
      totalHours: 0,
      events: [event1, event2, event3]
    })


    const usersArry = [user1, user2, user3]

    // save test data
    return Users.insertMany(usersArry)
  })
  .then(() => {

    // close the database
    mongoose.connection.close()
  })