const express = require('express');
const router = express.Router({ mergeParams: true });
const Users = require('../models/Users')
const Events = require('../models/Events')

/* GET users events list. */
router.get('/', (req, res, next) => {
    Users.find({ name: req.params.name })
        .then((listOfUsers) => {
            const listOfEvents = listOfUsers.events
            res.render('events/index', { listOfEvents: listOfEvents })
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

// // Show Route
// router.get('/:id', (req, res) => {
//     Users.findById(req.params.id)
//         .then((userProfile) => {
//             res.render('users/show', { userProfile })
//         })
// })

// // Edit Route
// router.get('/:id/edit', (req, res) => {
//     Users.findById(req.params.id)
//         .then((editUsers) => {
//             res.render('users/edit', { editUsers: editUsers })
//         })
// })

// // Update Route
// router.put('/:id', (req, res) => {
//     Users.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(() => {
//         // res.redirect(`/users/${req.params.id}`)
//         res.redirect(`/users/${req.params.id}`)
//     })
// })

// Delete Route
router.delete('/:id/events', (req, res) => {
    Users.findById(req.params.userId)
        .then((newEvent.events.remove) => {
            newEvent.events.push(newEventEntry)
        })
})

module.exports = router


