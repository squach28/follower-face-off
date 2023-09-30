import express from 'express'
const router = express.Router()
import querystring from 'querystring'
import dotenv from 'dotenv'
dotenv.config()
import crypto from 'crypto'
import { getAccessToken, getAccessTokenCallback } from '../controllers/authController.js'

const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('base64')
}

router.get('/', getAccessToken)


router.get('/callback', getAccessTokenCallback)

export default router