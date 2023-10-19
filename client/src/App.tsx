import { useState } from "react";
import StartGameDialog from "./components/StartGameDialog";
import GameBoard from "./components/GameBoard";


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

  const render = () => {
    switch(gameState) {
      case GameState.NOT_STARTED:
        return <StartGameDialog startGame={startGame}/>
      case GameState.IN_PROGRESS:
        return <GameBoard />
      case GameState.OVER:
        return <p>Game over :(</p>
      default:
        return null
    }
  }

  const startGame = () => {
    setGameState(GameState.IN_PROGRESS)
  }

  return (
    <div className="h-screen bg-black">
      {render()}
    </div>
  )
}

export default App
