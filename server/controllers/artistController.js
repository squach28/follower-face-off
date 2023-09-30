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