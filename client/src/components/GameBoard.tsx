import { useState, useEffect } from "react"
import { Artist } from "../App"
import ArtistCard from "./ArtistCard"
import ArtistCardSkeleton from "./ArtistCardSkeleton"

type GameBoardProps =  {
    category: string,
    endGame: (streak: number) => void
  }

const GameBoard: React.FC<GameBoardProps> = (gameBoardProps: GameBoardProps) => {
    const [artists, setArtists] = useState<Artist[]>([])
    const [streak, setStreak] = useState<number>(0)
    const [firstIndex, setFirstIndex] = useState<number|null>(null)
    const [secondIndex, setSecondIndex] = useState<number|null>(null)
    const [usedArtistIds, setUsedArtistIds] = useState<Set<string>>(new Set())
    const [highestStreak, setHighestStreak] = useState<number>(0)

    useEffect(() => {
      const scores = localStorage.getItem('scores')
      if(scores) {
        const data = JSON.parse(scores)
        if(data[gameBoardProps.category]) {
          setHighestStreak(data[gameBoardProps.category])
        }
      } 
      fetch(`http://localhost:4000/artist/getArtistsByCategory?category=${gameBoardProps.category}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          const length = data.length
          setArtists(data)
          setFirstIndex(0)
          setSecondIndex(length - 1)
        })
    }, [gameBoardProps.category])

    const storeHighestStreak = () => {
      const scores = localStorage.getItem('scores')
      if(scores) {
        let data = JSON.parse(scores)
        console.log('hello')
        console.log(data)
        console.log(data[gameBoardProps.category])
        if(data[gameBoardProps.category] !== undefined) {
          data = {
            ...data, 
            [gameBoardProps.category]: Math.max(streak, data[gameBoardProps.category])
          }
          localStorage.setItem('scores', JSON.stringify(data))
        } else {
          data = {
            ...data, 
            [gameBoardProps.category]: streak
          }
          localStorage.setItem('scores', JSON.stringify(data))
        }
      } else {
        const data = {
          [gameBoardProps.category]: streak
        }
        localStorage.setItem('scores', JSON.stringify(data))
      }
      console.log('done')
    }
  
    const handleFirstArtistCardClick = () => {
      if(firstIndex !== null && secondIndex !== null) {
        const selectedArtist = artists[firstIndex]
        const unselectedArtist = artists[secondIndex]
        if(judgeUserSelection(selectedArtist, unselectedArtist)) {
          console.log('yay, you got a point')
          incrementStreak()
          addArtistsToUsedArr(selectedArtist.id, unselectedArtist.id)
          generateNewUnusedArtistsArr()
        } else {
          storeHighestStreak()
          gameBoardProps.endGame(streak)
        }
      }
    }
  
  
    const handleSecondArtistCardClick = () => {
      if(firstIndex !== null && secondIndex !== null) {
        const selectedArtist = artists[secondIndex]
        const unselectedArtist = artists[firstIndex]
        if(judgeUserSelection(selectedArtist, unselectedArtist)) {
          console.log('yay, you got a point')
          incrementStreak()
          addArtistsToUsedArr(selectedArtist.id, unselectedArtist.id)
          generateNewUnusedArtistsArr()
        } else {
          storeHighestStreak()
          gameBoardProps.endGame(streak)
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

      <div className="w-full h-screen bg-black text-white flex flex-col px-4 py-2 space-around items-center">
        <div className="w-full flex justify-between items-center">
          <p>Highest Streak: {highestStreak}</p>
          <p className="mb-3">Streak: {streak}</p>
        </div>
        {      
            firstIndex !== null && secondIndex !== null && artists.length > 0 ? 
                <div className="flex flex-col flex-1">
                    <ArtistCard {...artists[firstIndex]} handleClick={handleFirstArtistCardClick}/>
                    <p className="text-center text-2xl">OR</p>
                    <ArtistCard {...artists[secondIndex]} handleClick={handleSecondArtistCardClick} />
                </div>
                :
                <div className="flex flex-col flex-1">
                  <ArtistCardSkeleton />
                  <p className="text-center text-2xl">OR</p>
                  <ArtistCardSkeleton />
                </div>
                  
        }

      </div>

    )
}

export default GameBoard