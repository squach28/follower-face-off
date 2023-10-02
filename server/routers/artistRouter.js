import express from 'express'
import { artistMiddleware, getArtist } from '../controllers/artistController.js'
const router = express.Router()

router.use('/', artistMiddleware)

router.get('/getArtist', getArtist)

export default router