import express from 'express'
const router = express.Router()
import querystring from 'querystring'
import dotenv from 'dotenv'
dotenv.config()
import crypto from 'crypto'

const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('base64')
}

router.get('/', (req, res) => {
    res.send('auth!')
})

router.get('/auth', (req, res) => {
    const redirectUri = 'http://localhost:4000/callback'
    const state = generateRandomString(10)
    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' + 
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: redirectUri,
            state: state,
            showDialog: true
        })
    )
})

export default router