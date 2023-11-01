import { Artist } from "../App"

type ArtistCardProps = Artist & {
  handleClick: () => void,
  correct: boolean | null
}

const ArtistCard: React.FC<ArtistCardProps> = (artistCardProps: ArtistCardProps) => {

  return (
    <div style={{backgroundImage: `url('${artistCardProps.images[0].url}')`}} className={`w-screen flex-1 bg-no-repeat bg-cover text-[#406E8E] relative gap-3 p-6 rounded-md md:w-[50%] md:h-[50%] ${artistCardProps.correct !== null ? artistCardProps.correct ? 'animate-correct-answer' : 'animate-wrong-answer' : ''} hover:cursor-pointer`} onClick={artistCardProps.handleClick}>
      <p className="bg-[#CBF7ED] text-4xl absolute font-bold left-0 bottom-0 p-1 rounded-sm opacity-75 select-none">{artistCardProps.name}</p>
    </div>
    )
}

export default ArtistCard