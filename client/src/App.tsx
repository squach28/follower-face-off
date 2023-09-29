import ArtistCard from "./components/ArtistCard"

const App = () => {

  return (
    <div className="w-full bg-black text-white flex flex-col p-4 space-around">
      <p>Which artist is more popular?</p>
      <ArtistCard />
      <p className="text-center text-2xl">OR</p>
      <ArtistCard />
    </div>

  )
}

export default App
