import { useEffect, useState } from "react";
import ArtistCard from "./components/ArtistCard"


export type ArtistImage = {
  width: number;
  height: number;
  url: string;

}

export type Artist = {
  id: string;
  followers: {
    href: string | null;
    total: number;
  },
  images: ArtistImage[],
  name: string;
  
}

const App = () => {
  const [artists, setArtists] = useState<Artist[]>([])
  const [streak, setStreak] = useState<number>(0)
  const [firstIndex, setFirstIndex] = useState<number|null>(null)
  const [secondIndex, setSecondIndex] = useState<number|null>(null)
  const usedArtistIds = new Set<string>()

  useEffect(() => {
    fetch(`http://localhost:4000/artist/getArtistsByCategory?category=pop`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        const length = data.length
        setArtists(data)
        setFirstIndex(Math.floor(Math.random() * length))
        setSecondIndex(Math.floor(Math.random() * length))
      })
  }, [])

  const handleArtistCardClick = () => {
    if(firstIndex !== null && secondIndex !== null) {
      usedArtistIds.add(artists[firstIndex].id)
      usedArtistIds.add(artists[secondIndex].id)
      const unusedArtists = artists.filter(artist => !usedArtistIds.has(artist.id))
      setArtists(unusedArtists)
      setFirstIndex(Math.floor(Math.random() * unusedArtists.length))
      setSecondIndex(Math.floor(Math.random() * unusedArtists.length))
      setStreak(prev => prev + 1)
    }
  }

  return (
    firstIndex !== null && secondIndex !== null && artists.length > 0 ?
    <div className="w-full h-screen bg-black text-white flex flex-col p-4 space-around items-center">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold">Follower Face Off</h1>
        <p>Streak: {streak}</p>
      </div>
      <p>Which artist has more followers?</p>
      <ArtistCard {...artists[firstIndex]} handleClick={handleArtistCardClick}/>
      <p className="text-center text-2xl">OR</p>
      <ArtistCard {...artists[secondIndex]} handleClick={handleArtistCardClick} />
    </div>
    :
    <div>Loading...</div>

  )
}

export default App
