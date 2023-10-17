import { getAccessToken, isTokenExpired } from "../utilities/spotifyToken.js"
import querystring from 'querystring'

const TOKEN_EXPIRATION_DURATION = 3600

const shuffleArray = (arr) => {
    let currentIndex = arr.length
    let randomIndex
    while(currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
    }

    return arr
}

export const artistMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.access_token
    const timestamp = req.cookies.timestamp
    if(accessToken && timestamp) {
        if(isTokenExpired(Math.floor(timestamp / 1000), TOKEN_EXPIRATION_DURATION)) {
            const accessTokenDetails = await getAccessToken()
            req.cookies.access_token =  accessTokenDetails.access_token
            req.cookies.token_type = accessTokenDetails.token_type
            req.cookies.expires_in = accessTokenDetails.expires_in
            req.cookies.timestamp = Date.now()
        }
    } else {
        const accessTokenDetails = await getAccessToken()
        req.cookies.access_token =  accessTokenDetails.access_token
        req.cookies.token_type = accessTokenDetails.token_type
        req.cookies.expires_in = accessTokenDetails.expires_in
        req.cookies.timestamp = Date.now()
    }
    next()

}

export const getArtist = async (req, res, next) => {
    try {
        const tokenType = req.cookies.token_type
        const accessToken = req.cookies.access_token
        const timestamp = req.cookies.timestamp
        const artist = await fetch('https://api.spotify.com/v1/artists/6HvZYsbFfjnjFrWF950C9d', {
            headers: {
                'Authorization': `Authorization: ${tokenType} ${accessToken}`
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => data)
        res.cookie('access_token', accessToken)
        res.cookie('token_type', tokenType)
        res.cookie('timestamp', timestamp)
        res.status(200).json(artist)
    } catch(e) {
        res.status(500).json({error: 'something happened oh no'})
    }
}

export const getArtistsByCategory = async (req, res, next) => {
    try {
        const tokenType = req.cookies.token_type
        const accessToken = req.cookies.access_token
        const timestamp = req.cookies.timestamp
        const category = req.query.category
        const artists = await fetch('https://api.spotify.com/v1/search?' +
            querystring.stringify({
                q: `genre:${category}`,
                type: 'artist',
                market: 'US',
                limit: 50
            })
        , {
            headers: {
                'Authorization': `Authorization: ${tokenType} ${accessToken}`
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => data.artists.items)
        const shuffled = shuffleArray(artists)
        res.cookie('access_token', accessToken)
        res.cookie('token_type', tokenType)
        res.cookie('timestamp', timestamp)
        res.status(200).json(shuffled)
        return next()
    } catch(e) {

    }
}