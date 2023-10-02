import express from 'express'
import { artistMiddleware, getArtist, getArtistsByCategory } from '../controllers/artistController.js'
const router = express.Router()

router.use('/', artistMiddleware)

router.get('/getArtist', getArtist)

router.get('/getArtistsByCategory', getArtistsByCategory)

export default router