export const getArtist = async (req, res) => {
    try {
        const artist = await fetch('https://api.spotify.com/v1/artists/6HvZYsbFfjnjFrWF950C9d')
            .then(res => res.json())
            .then(data => data)
        res.status(200).json('wow!')
    } catch(e) {

    }
}