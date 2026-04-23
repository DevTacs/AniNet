import type {AnimeDetails} from "@/types/anime.type"
import {useNavigate} from "@tanstack/react-router"

export default function FeaturedCards({data}: {data: AnimeDetails[]}) {
    const navigate = useNavigate()
    const handleOnClick = (slug: number) => navigate({to: `/anime/${slug}`})

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Featured Anime</h2>

            <div className="grid grid-cols-4 lg:grid-cols-7 gap-4">
                {data &&
                    data.map((anime) => (
                        <div
                            key={anime._id}
                            className="flex flex-col items-center mt-5">
                            <img
                                src={anime.imagePath}
                                className="w-full h-60 object-cover rounded"
                            />
                            <h2 className="text-sm font-bold mt-2 h-12.5">
                                {anime.name}
                            </h2>
                            <button
                                className="bg-accent text-white py-2 px-4 rounded mt-2 hover:bg-accent/50"
                                onClick={() => handleOnClick(anime._id)}>
                                Watch now
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    )
}
