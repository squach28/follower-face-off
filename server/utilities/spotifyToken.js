import querystring from'querystring'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

export const getAccessToken = async () => {
    const authOptions = { 
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
        }, 
        credentials: 'include',
        json: true,
        withCredentials: true
    }
    const res = await axios.post('https://accounts.spotify.com/api/token', 
    {
            grant_type: 'client_credentials'
        }, authOptions)
    const data = res.data
    return data 
}

export const isTokenExpired = (timestamp, expiresIn) => {
    const currentTime = Date.now() / 1000
    if(currentTime - timestamp >= expiresIn) {
        return true
    }
    return false
}
