
const ArtistCardSkeleton = () => {
  return (
    <div className="w-screen flex-1 bg-no-repeat bg-cover bg-gray-200 relative gap-3 p-6 rounded-md md:w-[50%] md:h-[50%]">
      <p className="text-4xl absolute font-bold left-2 bottom-2 select-none">Loading...</p>
    </div>
  )
}

export default ArtistCardSkeleton