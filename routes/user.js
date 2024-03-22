const express = require('express')
const { body, validationResult } = require('express-validator');

const router = express.Router()

router.get('/user' , [
  body('token').exists().withMessage('The user is not authorized.'),
  body('token').notEmpty().withMessage('The user is not authorized.'),
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  const { token } = req.body;
  if (token !== 'abcd') {
    return res.status(401).json({ error: 'The user is not authorized.' });
  }

  // Token is valid, return the data
  return res.json({
    message : 'The user is authorized.',
    data : {
      user: {
        name: 'Dummy User'
      }
    }
  });
});


router.get('/courses' , (req,res) => {
  res.send('This is Public API')
})

module.exports = router