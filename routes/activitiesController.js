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
    const eventId = req.params.eventId
    const userId = req.params.userId
    res.render('activities/new', {
        userId, eventId 
    })
})

// Create Route
router.post('/', (req, res) => {
    const newActivityEntry = new Activity(req.body)
    const eventId = req.params.eventId
    const userId = req.params.userId
    console.log('line 41 ' + userId)
    Users.findById(userId)
        .then((newActivity) => {
            const event = userActivity.events.id(eventId)
            const activity = event.activities.id(activityId)
            return newActivity.save()
        })
        .then((user) => {
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
    const userId = req.params.userId
    const eventId = req.params.eventId
    const activityId = req.params.id
    Users.findById(userId)
        .then(user => {
            const event = user.events.id(eventId)
            const activity = event.activities.id(activityId)
            console.log("edit act " + activity + eventId + userId)
            res.render('activities/edit', { activity, eventId, userId })
        })
})


// Update Route
router.put('/:id', (req, res) => {
    const userId = req.params.userId
    const eventId = req.params.eventId
    const activityId = req.params.id
    const updateActivity = req.body
    Users.findByIdAndUpdate(userId)
    .then((userActivity) => {
        const event = userActivity.events.id(eventId)
        const activity = event.activities.id(activityId)
       
        activity.name = updateActivity.name
        activity.description = updateActivity.description
        activity.location = updateActivity.location
        activity.supplies = updateActivity.supplies
        activity.contact = updateActivity.contact
        activity.photo = updateActivity.photo
      
        return userActivity.save()
    })
    .then(() => {
        res.redirect(`/users/${userId}/events/${eventId}/activities`)
    })
    .catch((error) => {
        console.log(error)
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


