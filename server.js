// Require modules
require('dotenv').config()
const express = require('express')

// Export 
const auth = require('./routes/auth')
const user = require('./routes/user')
const path = require('path')



// Express App
const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Routes
app.use('/api/auth' , auth)
app.use('/api/user' , user)


// Path for React App
const reactBuildDir = path.join(__dirname, 'client' , 'build' , 'index.html')
app.get('/' , (req, res) => {
  res.sendFile(reactBuildDir)
})
app.get('/api' , (req, res) => {
  res.send("Welcome to the Backend")
})


// Listen
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})