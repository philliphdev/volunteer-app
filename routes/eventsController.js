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
router.get('/:eventId', (req, res) => {
    const eventId = req.params.eventId
    const userId = req.params.userId
    Users.findById(userId)
        .then(user => {
            const event = user.events.id(eventId)
            // console.log(eventId)
            console.log(event)
            res.render('events/show', {
                event,
                userId
            })
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
})

// Edit Route
router.get('/:eventId/edit', (req, res) => {
    const eventId = req.params.eventId
    const userId = req.params.userId
    Users.findById(userId)
        .then(user => {
            const event = user.events.id(eventId)
            res.render('events/edit', { event, userId })
        })
})

// Update Route
router.put('/:eventId', (req, res) => {
    const userId = req.params.userId
    const eventId = req.params.eventId
    const updateEvent = req.body
    console.log("line 78 " + userId)

    Users.findByIdAndUpdate(userId)
        .then((userEvent) => {
            const event = userEvent.events.id(eventId)

            event.name = updateEvent.name
            event.description = updateEvent.description
            event.location = updateEvent.location 
            event.startDate = updateEvent.startDate
            event.endDate = updateEvent.endDate
            event.contact = updateEvent.contact
            event.attended = updateEvent.attended
            event.activities = updateEvent.activities

            return userEvent.save()
        })    
        .then(() => { 
            res.redirect(`/users/${userId}/events`)
        })
        .catch((error) => {
            console.log(error)
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


