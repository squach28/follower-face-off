import { Artist } from "../App"

type ArtistCardProps = Artist & {
  handleClick: () => void
}

const ArtistCard: React.FC<ArtistCardProps> = (artistCardProps: ArtistCardProps) => {

  return (
    <div style={{backgroundImage: `url('${artistCardProps.images[0].url}')`}} className={`w-[320px] h-[320px] bg-no-repeat bg-cover text-white relative gap-3 p-6 rounded-md`} onClick={artistCardProps.handleClick}>
      <p className="text-4xl absolute font-bold left-2 bottom-2 select-none">{artistCardProps.name}</p>
    </div>
    )
}

export default ArtistCard