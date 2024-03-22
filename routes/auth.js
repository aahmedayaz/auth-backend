const express = require('express');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;
const db = require('../db.json');
const { body, validationResult } = require('express-validator');

const router = express.Router()

router.post('/signup', [
  body('email').isEmail().withMessage('Invalid email address.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      error: true,
      statusCode: 400,
      data: null
    });
  }

  // Get inputs
  const { email, password } = req.body;
  
  // If admin not found, return error message
  const userAlreadyExist = db.user.some(user => user.email === email);
  if (userAlreadyExist) {
    return res.status(401).json({
      message: 'Account with this email already exist.',
      error: true,
      statusCode: 401,
      data: null
    });
  };

  // Create new user
  const newUser = {
    id: uuidv4(),
    email,
  };

  // Encrypt Password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt); // encrypt password

  // Add user in database
  db.user.push(newUser);

  // Remove password to user object to client
  const { password: encryptedPassword, ...userWithoutPassword } = newUser;

  // If admin found, return success message
  return res.json({
    message: 'Your account has been created successfully.',
    error: false,
    statusCode: 200,
    data: {
      token: 'abcd',
      user: userWithoutPassword,
    }
  });
})

router.post('/login' , [
  body('email').isEmail().withMessage('Invalid email address.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      error: true,
      statusCode: 400,
      data: null
    });
  }

  // Get inputs
  const { email, password } = req.body;

  // If user not found, return error message
  const user = db.user.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password',
      error: true,
      statusCode: 401,
      data: null
    });
  }

  // If password is not matched, return error message
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(401).json({
      message: 'Invalid email or password',
      error: true,
      statusCode: 401,
      data: null
    });
  }

  // Remove password to user object to client
  const { password: encryptedPassword, ...userWithoutPassword } = user;

  // email and password are correct, return success message
  return res.json({
    message: 'Your are logged in successfully.',
    error: false,
    statusCode: 200,
    data: {
      token: 'abcd',
      user: userWithoutPassword,
    }
  });
})

module.exports = router