const express = require('express')
const data = require('../data.json')
const { body, validationResult } = require('express-validator');

const router = express.Router()

router.post('/signup', [
  body('email').isEmail().withMessage('Invalid email address.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      error: true,
      statusCode: 400,
      data: null
    });
  }

  // Extract email and password from request body
  const { email } = req.body;

  // Check if the email and password match any admin
  const adminAlreadyExist = data.admins.some(admin => admin.email === email);

  if (adminAlreadyExist) {
    // If admin not found, return error message
    return res.status(401).json({
      message: 'Account with this email already exist.',
      error: true,
      statusCode: 401,
      data: null
    });
  }

  // If admin found, return success message
  return res.json({
    message: 'Your account has been created successfully.',
    error: false,
    statusCode: 200,
    data: {
      token: 'abcd'
    }
  });
})

router.post('/login' , (req, res) => {
  res.send("I am Login")
})

module.exports = router