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

module.exports = router;
