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
    Users.findById(eventId)
        .then(user => {
            const activity = user.events.activities.id
            console.log("line 16 " + activity)
            res.render('activities/index', { 
                activity: activity,
                activityId: eventId
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
    Users.findById(req.params.userId)
        .then((newActivity) => {
            newActivity.activity.push(newActivity)
            return newActivity.save()
        })
        .then(() => {
            res.redirect(`/users/${req.params.userId}/activities`)
        })
})

// Show Route
router.get('/:id', (req, res) => {
    Users.findById(req.params.userId)
        .then((listActivity) => {
            res.render('activities/show', { listActivity })
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


