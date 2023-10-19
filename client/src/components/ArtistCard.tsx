import { Artist } from "../App"

type ArtistCardProps = Artist & {
  handleClick: () => void
}

const ArtistCard: React.FC<ArtistCardProps> = (artistCardProps: ArtistCardProps) => {

  return (
    <div style={{backgroundImage: `url('${artistCardProps.images[0].url}')`}} className={`w-screen flex-1 bg-no-repeat bg-cover text-purple-700 relative gap-3 p-6 rounded-md`} onClick={artistCardProps.handleClick}>
      <p className="bg-white text-4xl absolute font-bold left-0 bottom-0 p-1 rounded-sm opacity-75 select-none">{artistCardProps.name}</p>
    </div>
    )
}

export default ArtistCard