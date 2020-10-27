import express from 'express'
import QueueController from '../controllers/Queue'
import handler from 'express-async-handler'
const router = express.Router()

router.post('/producer', handler(QueueController.producer))
router.get('/consumer', handler(QueueController.consumer))

module.exports = router
