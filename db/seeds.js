const mongoose = require('mongoose')
const Users = require('../models/Users')
const Events = require('../models/Events')
const Activity = require('../models/Activity')

// Connect to Database
mongoose.connect('mongodb://localhost/volunteer-app')
  .then(() => {
    console.log('connected to mongoDB')
  })
  .catch((err) => {
    console.log('ERROR', err)
  })


Users.remove()
  .then(() => {
    const activity1 = new Activity({
        name: String,
        description: String,
        location: String,
        supplies: String,
        contact: String,
        hours: Number,
      })
    const event1 = new Events({
        name: String,
        description: Number,
        location: String,
        startDate: Date,
        endDate: Date,
        contact: String,
        attended: Boolean,
        activities: []
    })

    const event1 = new Events({
        name: String,
        description: Number,
        location: String,
        startDate: Date,
        endDate: Date,
        contact: String,
        attended: Boolean,
        activities: []
    })
    const event1 = new Events({
        name: String,
        description: Number,
        location: String,
        startDate: Date,
        endDate: Date,
        contact: String,
        attended: Boolean,
        activities: []
    })


    // create new test Homework data
    const homework1 = new Homework({
      title: 'Pirates Read/Create',
      description: 'pirates',
      subject: 'express',
      createdBy: 'bob',
      comments: [ comment1, comment2 ]
    })
    const homework2 = new Homework({
      title: 'Pirates update/dleete',
      description: 'more pirates',
      subject: 'express',
      createdBy: 'joof',
      comments: [ comment1, comment2 ]
    })
    const homework3 = new Homework({
      title: 'Pizza Express',
      description: 'PIZZA',
      subject: 'React',
      createdBy: 'sal',
      comments: [ comment1, comment2 ]
    })
    const homework4 = new Homework({
      title: 'final project',
      description: 'everything',
      subject: 'rails',
      createdBy: 'bryan',
      comments: [ comment1, comment2 ]
    })

    const homeworks = [ homework1, homework2, homework3, homework4 ]

    // save test data
    return Homework.insertMany(homeworks)
  })
  .then(() => {

    // close the database
    mongoose.connection.close()
  })