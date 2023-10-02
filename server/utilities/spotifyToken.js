import querystring from'querystring'
import dotenv from 'dotenv'
dotenv.config()

export const getAccessToken = async () => {
    console.log('get access token!')
    const authOptions = { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
        }, 
        json: true 
    }
    const res = await fetch('https://accounts.spotify.com/api/token?' + 
        querystring.stringify({
            grant_type: 'client_credentials'
        }), authOptions)
    const data = await res.json()
    return data 
}

export const isTokenExpired = (timestamp, expiresIn) => {
    const currentTime = Date.now() / 1000
    if(currentTime - timestamp >= expiresIn) {
        return true
    }
    return false
}
