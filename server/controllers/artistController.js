import { getAccessToken, isTokenExpired } from "../utilities/spotifyToken.js"
import querystring from 'querystring'

const TOKEN_EXPIRATION_DURATION = 3600

export const artistMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.access_token
    const timestamp = req.cookies.timestamp
    if(accessToken && timestamp) {
        if(isTokenExpired(Math.floor(timestamp / 1000), TOKEN_EXPIRATION_DURATION)) {
            const accessTokenDetails = await getAccessToken()
            res.cookie('access_token', accessTokenDetails.access_token)
            res.cookie('token_type', accessTokenDetails.token_type)
            res.cookie('expires_in', accessTokenDetails.expires_in)
            res.cookie('timestamp', Date.now())
        }
    } else {
        const accessTokenDetails = await getAccessToken()
        res.cookie('access_token', accessTokenDetails.access_token)
        res.cookie('token_type', accessTokenDetails.token_type)
        res.cookie('expires_in', accessTokenDetails.expires_in)
        res.cookie('timestamp', Date.now())
    }
    next()
}

export const getArtist = async (req, res) => {
    try {
        const tokenType = req.cookies.token_type
        const accessToken = req.cookies.access_token
        const artist = await fetch('https://api.spotify.com/v1/artists/6HvZYsbFfjnjFrWF950C9d', {
            headers: {
                'Authorization': `Authorization: ${tokenType} ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => data)
        res.status(200).json(artist)
    } catch(e) {

    }
}

export const getArtistsByCategory = async (req, res) => {
    try {
        const tokenType = req.cookies.token_type
        const accessToken = req.cookies.access_token
        const category = req.query.category
        const artist = await fetch('https://api.spotify.com/v1/search?' +
            querystring.stringify({
                q: `genre:${category}`,
                type: 'artist',
                market: 'US',
                limit: 10
            })
        , {
            headers: {
                'Authorization': `Authorization: ${tokenType} ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => data)
        res.status(200).json(artist)
    } catch(e) {

    }
}