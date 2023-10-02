import querystring from'querystring'
import dotenv from 'dotenv'
dotenv.config()

export const getAccessToken = async () => {
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
    const data = res.json()
    return data 
}