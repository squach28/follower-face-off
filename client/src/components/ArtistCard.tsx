import { Artist } from "../App"

const ArtistCard = (artist: Artist) => {

  console.log(artist.images[0])
  return (
    <div style={{backgroundImage: `url('${artist.images[0].url}')`}} className={`w-[320px] h-[320px] bg-no-repeat bg-cover text-white flex flex-col justify-center items-center gap-3 p-6 rounded-md`}>
      <p className="text-4xl font-bold">{artist.name}</p>
    </div>
    )
}

export default ArtistCard