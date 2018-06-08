const express = require('express');
const router = express.Router({ mergeParams: true });
const Users = require('../models/Users')
const Events = require('../models/Events')

/* GET users events list. */
router.get('/', (req, res, next) => {
    Users.findById(req.params.userId)
        .then((listOfUsers) => {
            console.log(listOfUsers)
            listOfUsers.events
            console.log("line 12 " + listOfEvents)
            res.render('events/index', { listOfUsers: listOfUsers })
        })
        .catch((error) => res.send(error))

})

// New Route
router.get('/new', (req, res) => {
    res.render('events/new', {
        userId: req.params.userId
    })
})

// Create Route
router.post('/', (req, res) => {
    const newEventEntry = new Events(req.body)
    Users.findById(req.params.userId)
        .then((newEvent) => {
            newEvent.events.push(newEventEntry)
            return newEvent.save()
        })
        .then(() => {
            res.redirect(`/users/${req.params.userId}/events`)
        })
})

// Show Route
router.get('/:id', (req, res) => {
    Users.findById(req.params.userId)
        .then((listEvent) => {
            res.render('events/show', { listEvent })
        })
})

// Edit Route
router.get('/:id/edit', (req, res) => {
    Users.findById(req.params.UserId)
        .then((editEvent) => {
            res.render('events/edit', { editEvent: editEvent })
        })
})

// Update Route
router.put('/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.Id, req.body, { new: true }).then(() => {
        // res.redirect(`/users/${req.params.id}`)
        res.redirect(`/events/${req.params.id}`)
    })
})

// Delete Route
router.delete('/:id/events', (req, res) => {
    Users.findById(req.params.userId)
        .then((newEvent) => {
            newEvent.events.push(newEvent)
        })
        // .then((newEvent.events.remove) => {
        //     newEvent.events.push(newEventEntry)
        // })
})

module.exports = router


