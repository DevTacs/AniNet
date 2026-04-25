import {getAnimeByCategory} from "@/services/anime.service"
import type {AnimeDetails} from "@/types/anime.type"
import {useQuery} from "@tanstack/react-query"
import {useNavigate, createFileRoute} from "@tanstack/react-router"
import {useState} from "react"

export const Route = createFileRoute("/anime/browse")({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()

    const genre = [
        "action",
        "romance",
        "harem",
        "ecchi",
        "fantasy",
        "school",
        "drama",
        "supernatural",
        "comedy",
        "adventure",
        "shounen",
        "magic",
    ]

    // ✅ restore from localStorage
    const [selectedCategory, setSelectedCategory] = useState<string>(genre[0])

    const {data} = useQuery<AnimeDetails[]>({
        queryKey: ["anime", "browse", selectedCategory],
        queryFn: () => getAnimeByCategory(selectedCategory, 1),
    })

    return (
        <div className="min-h-screen px-10 py-6 bg-background text-foreground">
            {/* 🔍 Search */}
            <div className="flex justify-end gap-3">
                <input
                    type="text"
                    placeholder="Search anime..."
                    className="w-75 border border-white/10 bg-white/5 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-accent transition"
                />
                <button className="bg-accent px-5 py-2 rounded-lg font-medium hover:bg-accent/80 transition">
                    Search
                </button>
            </div>

            {/* 🎭 Genre filter */}
            <div className="flex flex-wrap gap-3 mt-8">
                {genre.map((g) => (
                    <button
                        key={g}
                        className={`px-4 py-1.5 rounded-full border text-sm transition ${
                            selectedCategory === g
                                ? "bg-accent text-white border-accent"
                                : "border-white/10 bg-white/5 hover:bg-accent hover:text-white"
                        }`}
                        onClick={() => {
                            setSelectedCategory(g)
                        }}>
                        {g}
                    </button>
                ))}
            </div>

            {/* 🎬 Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 mt-10">
                {data &&
                    data.map((anime) => (
                        <div
                            key={anime._id}
                            onClick={() =>
                                navigate({to: `/anime/watch/${anime._id}`})
                            }
                            className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl bg-white/5 hover:scale-105 transition">
                                <img
                                    src={anime.imagePath}
                                    className="w-full h-60 object-cover"
                                />

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <span className="bg-accent px-4 py-2 rounded text-sm font-medium">
                                        ▶ Watch
                                    </span>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black/70 to-transparent" />
                            </div>

                            <h3 className="text-sm mt-2 line-clamp-2 text-foreground/90 group-hover:text-foreground transition">
                                {anime.name}
                            </h3>
                        </div>
                    ))}
            </div>
        </div>
    )
}
