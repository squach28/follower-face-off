import express from 'express'
import { artistMiddleware, getArtist, getArtistsByCategory } from '../controllers/artistController.js'
const router = express.Router()

router.get('/getArtist', artistMiddleware, getArtist)

router.get('/getArtistsByCategory', artistMiddleware, getArtistsByCategory)

export default router