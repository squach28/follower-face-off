const StartGameDialog = () => {

    return (
        <div className="flex flex-col justify-center items-center gap-5 bg-gray-500 p-3">
            <h1 className="text-3xl">Spotify Popularity Contest</h1>
            <p>Think you know which bands are the most popular?</p>
            <button className="bg-green-500 px-5 py-2 rounded-md font-bold">Start</button>
        </div>
    )
}

export default StartGameDialog