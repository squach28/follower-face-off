import { useState } from "react";
import StartGameDialog from "./components/StartGameDialog";
import GameBoard from "./components/GameBoard";
import GameOverDialog from "./components/GameOverDialog";


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

export enum GameState {
  NOT_STARTED,
  IN_PROGRESS,
  OVER
}

const App = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.NOT_STARTED)
  const [streak, setStreak] = useState(0)
  const categories: string[] = [
    'pop',
    'k-pop',
    'hip-hop',
    'rock'
  ]

  const startGame = () => {
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
        return <StartGameDialog startGame={startGame}/>
      case GameState.IN_PROGRESS:
        return <GameBoard category={categories[3]} endGame={endGame} />
      case GameState.OVER:
        return <GameOverDialog streak={streak} startGame={startGame} goToMenu={goToMenu} />
      default:
        return null
    }
  }

  return (
    <div className="h-screen bg-black">
      {render()}
    </div>
  )
}

export default App
