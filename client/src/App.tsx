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
  const [usedArtistIds, setUsedArtistIds] = useState<Set<string>>(new Set())
  useEffect(() => {
    fetch(`http://localhost:4000/artist/getArtistsByCategory?category=pop`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        const length = data.length
        setArtists(data)
        setFirstIndex(0)
        setSecondIndex(length - 1)
      })
  }, [])

  const handleFirstArtistCardClick = () => {
    console.log('first clicked')
    if(firstIndex !== null && secondIndex !== null) {
      const selectedArtist = artists[firstIndex]
      const unselectedArtist = artists[secondIndex]
      if(judgeUserSelection(selectedArtist, unselectedArtist)) {
        console.log('yay, you got a point')
        incrementStreak()
        addArtistsToUsedArr(selectedArtist.id, unselectedArtist.id)
        generateNewUnusedArtistsArr()
      } else {
        setStreak(0)
        console.log('u suck')
      }
    }
  }


  const handleSecondArtistCardClick = () => {
    console.log('second clicked')
    if(firstIndex !== null && secondIndex !== null) {
      console.log('in')
      const selectedArtist = artists[secondIndex]
      const unselectedArtist = artists[firstIndex]
      if(judgeUserSelection(selectedArtist, unselectedArtist)) {
        console.log('yay, you got a point')
        incrementStreak()
        addArtistsToUsedArr(selectedArtist.id, unselectedArtist.id)
        generateNewUnusedArtistsArr()
      } else {
        console.log('u suck')
      }
    }
  }

  const incrementStreak = () => {
    setStreak(prev => prev + 1)
  }

  const addArtistsToUsedArr = (...artists: string[]) => {
    const newSet = usedArtistIds
    for(const artist of artists) {
      newSet.add(artist)
    }
    setUsedArtistIds(newSet)
  }

  const generateNewUnusedArtistsArr = () => {
    console.log(usedArtistIds)
    const unusedArtists = artists.filter(artist => !usedArtistIds.has(artist.id))
    setArtists(() => {
      setFirstIndex(0)
      setSecondIndex(unusedArtists.length - 1)
      return unusedArtists
    })
  }


  const judgeUserSelection = (selectedArtist: Artist, unselectedArtist: Artist): boolean => {
    return selectedArtist.followers.total > unselectedArtist.followers.total
  }

  return (
    firstIndex !== null && secondIndex !== null && artists.length > 0 ?
    <div className="w-full h-screen bg-black text-white flex flex-col p-4 space-around items-center">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold">Follower Face Off</h1>
        <p>Streak: {streak}</p>
      </div>
      <ArtistCard {...artists[firstIndex]} handleClick={handleFirstArtistCardClick}/>
      <p className="text-center text-2xl">OR</p>
      <ArtistCard {...artists[secondIndex]} handleClick={handleSecondArtistCardClick} />
    </div>
    :
    <div>Loading...</div>

  )
}

export default App
