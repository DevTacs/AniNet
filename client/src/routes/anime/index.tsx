import {getFeaturedAnime} from "@/services/anime.service"
import type {AnimeDetails} from "@/types/anime.type"
import {useQuery} from "@tanstack/react-query"
import {createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute("/anime/")({
    component: RouteComponent,
})

function RouteComponent() {
    const {data} = useQuery<AnimeDetails[]>({
        queryKey: ["anime", "featured"],
        queryFn: getFeaturedAnime,
    })

    return (
        <div className="min-h-screen p-6 lg:p-10">
            {/* FEATURED */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Featured Anime</h2>

                <div className="grid grid-cols-4 lg:grid-cols-7 gap-4">
                    {data &&
                        data.map((anime) => (
                            <div key={anime._id} className="">
                                <img
                                    src={anime.imagePath}
                                    className="w-full h-60 object-cover rounded"
                                />
                                <h2 className="text-sm font-bold mt-2 h-12.5">
                                    {anime.name}
                                </h2>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600">
                                    Watch now
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
