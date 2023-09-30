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
    const state = generateRandomString(10)
    const scope = 'user-read-private user-read-email'
    const redirectUri = 'http://localhost:4000/auth/callback'
    res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: redirectUri,
        state: state
    }))
})


router.get('/callback', (req, res) => {
    const code = req.query.code 
    const state = req.query.state 
    console.log('code', code)

    const redirectUri = 'http://localhost:4000/auth/callback'
    if(state === null) {
        res.redirect('/#' + 
            querystring.stringify({
                error: 'state_mismatch'
            }))
    } else {
        const authOptions = { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Authorization': 'Basic ' + (new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')) 
            }, 
            json: true 
        }
        fetch('https://accounts.spotify.com/api/token?' + 
            querystring.stringify({
                code: code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            }), authOptions)
            .then(res => res.json())
            .then(data => {
                res.cookie('access_token', data.access_token)
                res.cookie('refresh_token', data.refresh_token)
                console.log('token_type', data.token_type)
                res.status(200).json(data)
            })
    }
})

export default router