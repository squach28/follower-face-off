import { useContext, useState } from "react";
import StartGameDialog from "./components/StartGameDialog";
import GameBoard from "./components/GameBoard";
import GameOverDialog from "./components/GameOverDialog";
import { CategoryContext } from "./context/CategoryContext";


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

enum GameState {
  NOT_STARTED,
  IN_PROGRESS,
  OVER
}

const App = () => {
  const categoryContext =  useContext(CategoryContext)
  const [gameState, setGameState] = useState<GameState>(GameState.NOT_STARTED)
  const [streak, setStreak] = useState(0)
  const categories: string[] = [
    'pop',
    'k-pop',
    'hip-hop',
    'rock'
  ]

  const startGame = () => {
    console.log('starting game')
    console.log(categoryContext)
    setGameState(GameState.IN_PROGRESS)
  }

  const endGame = (streak: number) => {
    setGameState(GameState.OVER)
    setStreak(streak)
  }

  const goToMenu = () => {
    setGameState(GameState.NOT_STARTED)
  }

  const render = () => {
    switch(gameState) {
      case GameState.NOT_STARTED:
        return <StartGameDialog startGame={startGame} categories={categories} />
      case GameState.IN_PROGRESS:
        return <GameBoard category={categoryContext?.category ? categoryContext.category : 'pop'} endGame={endGame} />
      case GameState.OVER:
        return <GameOverDialog streak={streak} startGame={startGame} goToMenu={goToMenu} />
      default:
        return null
    }
  }
  return (
      <div className="h-screen">
        {render()}
      </div>
  )
}

export default App
