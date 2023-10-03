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
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    fetch(`http://localhost:4000/artist/getArtistsByCategory?category=pop`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setArtists(data))
  }, [])

  return (
    artists.length > 0 ?
    <div className="w-full h-screen bg-black text-white flex flex-col p-4 space-around items-center">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold">Follower Face Off</h1>
        <p>Streak: {streak}</p>
      </div>
      <p>Which artist has more followers?</p>
      <ArtistCard {...artists[index]}/>
      <p className="text-center text-2xl">OR</p>
      <ArtistCard {...artists[index + 1]} />
    </div>
    :
    <div>Loading...</div>

  )
}

export default App
