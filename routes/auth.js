const express = require('express')
const data = require('../data.json')

const router = express.Router()

router.post('/signup' , (req, res) => {
  res.json(data)
})

router.post('/login' , (req, res) => {
  res.send("I am Login")
})

module.exports = router