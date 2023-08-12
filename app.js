const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config();

const contactsRouter = require('./routes/contacts');

const usersRouter = require('./routes/usersRoutes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/contacts', contactsRouter);
app.use('/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app