const express = require('express');
const router = express.Router({ mergeParams: true });
const Users = require('../models/Users')
const Events = require('../models/Events')
const Activity = require('../models/Activity')

/* GET users events activity list. */
router.get('/', (req, res, next) => {
    const eventId = req.params.eventId
    const userId = req.params.userId
    console.log(userId)
    console.log(eventId)
    Users.findById(userId)
        .then((user) => {
            const event = user.events.id(eventId)
            console.log("line 16 ", event)
            res.render('activities/index', {
                event,
                userId,
                eventId
            })
        })
        .catch((error) => res.send(error))

})

// New Route
router.get('/new', (req, res) => {
    res.render('activities/new', {
        userId: req.params.userId
    })
})

// Create Route
router.post('/', (req, res) => {
    const newActivityEntry = new Activities(req.body)
    const eventId = req.params.eventId
    const userId = req.params.userId
    const activityId = req.params.id
    Users.findById(userId)
        .then((newActivity) => {
            newActivity.activity.push(newActivity)
            return newActivity.save()
        })
        .then(() => {
            console.log("line 46 " + eventId)
            res.redirect(`/users/${userId}/events/${eventId}`)
        })
})

// Show Route
router.get('/:id', (req, res) => {
    const userId = req.params.userId
    const eventId = req.params.eventId
    const activityId = req.params.id
    Users.findById(userId)
        .then((user) => {
            const event = user.events.id(eventId)
            const activity = event.activities.id(activityId)
            res.render('activities/show', { activity, eventId, userId })
        })
})

// Edit Route
router.get('/:id/edit', (req, res) => {
    Users.findById(req.params.UserId)
        .then((editActivity) => {
            res.render('activities/edit', { editActivity: editActivity })
        })
})

// Update Route
router.put('/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.Id, req.body, { new: true }).then(() => {
        // res.redirect(`/users/${req.params.id}`)
        res.redirect(`/activities/${req.params.id}`)
    })
})

// Delete Route
router.delete('/:id/activities', (req, res) => {
    Users.findById(req.params.userId)
        .then((deleteActivity) => {
            deleteActivity.activities.push(deleteActivity)
        })
    // .then((newEvent.events.remove) => {
    //     newEvent.events.push(newEventEntry)
    // })
})

module.exports = router


