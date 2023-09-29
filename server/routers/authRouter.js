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
    const authOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64'))
        },
        json: true
    }
    fetch('https://accounts.spotify.com/api/token?' + querystring.stringify({ grant_type: 'client_credentials'}), authOptions)   
        .then(response => response.json())
        .then(data => res.json(data))
})

export default router