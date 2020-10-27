import express from 'express'
import Queue from './Queue'

const routes = express.Router()

routes.use(`/queue`, Queue)

module.exports = routes
