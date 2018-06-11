const express = require('express');
const router = express.Router({ mergeParams: true });
const Users = require('../models/Users')
const Events = require('../models/Events')

/* GET users events list. */
router.get('/', (req, res, next) => {
    Users.findById(req.params.userId)
        .then((listOfUsers) => {
            const listOfEvents = listOfUsers.events
            res.render('events/index', { 
                listOfEvents: listOfEvents,
                userId: req.params.userId
            })
        })
        .catch((error) => res.send(error))

})

// New Route
router.get('/new', (req, res) => {
    // const userId = req.params.userId
    res.render('events/new', {
        userId: req.params.userId
    })
})

// Create Route
router.post('/', (req, res) => {
    const newEventEntry = new Events(req.body)
    const userId = req.params.userId
    Users.findById(userId)
        .then((newEvent) => {
            newEvent.events.push(newEventEntry)
            return newEvent.save()
        })
        .then(() => {
            res.redirect(`/users/${userID}/events`)
        })
        .catch((error) => res.send(error))
})

// Show Route
router.get('/:id', (req, res) => {
    const eventId = req.params.id
    const userId = req.params.userId
    Users.findById(userId)
        .then(user => {
            const event = user.events.id(eventId)
            // console.log(eventId)
            console.log(event)
            res.render('events/show', { event,
            userId })
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
})

// Edit Route
router.get('/:id/edit', (req, res) => {
    const eventId = req.params.id
    const userId = req.params.userId
    Users.findById(userId)
        .then(user => {
            const event = user.events.id(eventId)
            res.render('events/edit', { event })
        })
})

// Update Route
router.put('/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.Id, req.body, { new: true }).then(() => {
        // res.redirect(`/users/${req.params.id}`)
        res.redirect(`/events/${req.params.id}`)
    })
})

router.get('/:eventId/delete', (req, res) => {
    const userId = req.params.userId
    const eventId = req.params.eventId
  
    Users.findById(userId)
      .then((user) => {
        user.events.id(eventId).remove()
        return user.save()
      })
      .then(() => {
        res.redirect(`/users/${userId}/events/`)
      })
      .catch((error) => {
        console.log(error)
      })
  })

module.exports = router


