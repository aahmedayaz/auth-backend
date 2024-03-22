const express = require('express');
const db = require('../db.json');
const auth = require('../middleware/auth');
const router = express.Router();

// @route GET /api/user
// @desc Get user data
// @access Private
router.get('/' , [auth], (req, res) => {
  try {
    // Get input
    const userId = req.user.id;
  
    // Get User data
    const user = db.user.find(user => user.id === userId);

    // Remove password to user object to client
    const { password: encryptedPassword, ...userWithoutPassword } = user;
  
    // Token is valid, return the data
    return res.status(200).json({
      message: 'User data has been loaded successfully.',
      error: false,
      statusCode: 200,
      data: {
        user: userWithoutPassword,
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error.',
      error: true,
      statusCode: 500,
      data: null
    });
  }
});

// @route DELETE /api/user
// @desc Delete a user
// @access Private
router.delete('/' , [auth], (req,res) => {
  try {
    // Get input
    const userId = req.user.id;
  
    // Get Index of user i want to delete
    const userIndex = db.user.findIndex(user => user.id === userId);
    if(userIndex == -1) {
      return res.status(404).json({
        message: 'User not found.',
        error: true,
        statusCode: 404,
        data: null
      });
    }

    // User is deleted from dB
    const deletedUser = db.user.splice(userIndex, 1);
  
    // If Token is valid, return deletedUser's id
    return res.status(200).json({
      message: 'Your account have been deleted successfully.',
      error: false,
      statusCode: 200,
      data: {
        user: {
          id: deletedUser[0].id
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error.',
      error: true,
      statusCode: 500,
      data: null
    });
  }
})

module.exports = router