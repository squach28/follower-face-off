import { Artist } from "../App"

type ArtistCardProps = Artist & {
  handleClick: () => void
}

const ArtistCard: React.FC<ArtistCardProps> = (artistCardProps: ArtistCardProps) => {

  return (
    <div style={{backgroundImage: `url('${artistCardProps.images[0].url}')`}} className={`w-[320px] h-[320px] bg-no-repeat bg-cover text-white flex flex-col justify-center items-center gap-3 p-6 rounded-md`} onClick={artistCardProps.handleClick}>
      <p className="text-4xl font-bold select-none">{artistCardProps.name}</p>
    </div>
    )
}

export default ArtistCard