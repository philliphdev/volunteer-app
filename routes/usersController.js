const express = require('express');
const router = express.Router();
const Users = require('../models/Users')

/* GET users listing. */
router.get('/', (req, res, next) => {
  Users.find()
    .then((listOfUsers) => {
      res.render('users/index', { listOfUsers: listOfUsers })
    })
    .catch((err) => res.send(err))

})

// New Route
router.get('/new', (req, res) => {
  res.render('users/new')
})

// Create Route
router.post('/', (req, res) => {
  const newUser = req.body
  Users.create(newUser)
    .then(() => {
      res.redirect('/users')
    })
})

// Show Route
router.get('/:id', (req, res) => {
  Users.findById(req.params.id)
    .then((userProfile) => {
      res.render('users/show', { userProfile })
    })
})

// Edit Route
router.get('/:id/edit', (req, res) => {
  Users.findById(req.params.id)
    .then((editUsers) => {
      res.render('users/edit', { editUsers: editUsers })
    })
})

// Update Route
router.put('/:id', (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(() => {
    // res.redirect(`/users/${req.params.id}`)
    res.redirect(`/users/${req.params.id}`)
  })
})

// Delete Route
router.delete('/:id', (req, res) => {
  const userId = req.params.id
  Users.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log("Delete id")
      res.redirect('/users')
    })
    .catch((err) => res.send(err))
})

module.exports = router;
