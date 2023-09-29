const ArtistCard = () => {
    return (
      <div className="w-full bg-white text-black flex  flex-col items-center gap-3 p-6 rounded-md">
        <img width={120} className="rounded-full" src="https://i.scdn.co/image/ab6761610000f1785da361915b1fa48895d4f23f" alt="newjeans!" />
        <p className="text-xl">NewJeans</p>
        <p>Top Tracks</p>
        <ul className="flex flex-col justify-center items-center">
          <li>1. Super Shy</li>
          <li>2. ETA</li>
          <li>3. OMG</li>
        </ul>
      </div>
    )
}

export default ArtistCard