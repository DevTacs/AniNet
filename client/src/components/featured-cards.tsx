import type {AnimeDetails} from "@/types/anime.type"
import {useNavigate} from "@tanstack/react-router"

export default function FeaturedCards({data}: {data: AnimeDetails[]}) {
    const navigate = useNavigate()

    const handleOnClick = (slug: number) =>
        navigate({to: `/anime/watch/${slug}`})

    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-6">Featured Anime</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
                {data?.map((anime) => (
                    <div
                        key={anime._id}
                        onClick={() => handleOnClick(anime._id)}
                        className="group cursor-pointer">
                        {/* Card */}
                        <div className="relative overflow-hidden rounded-xl bg-white/5 hover:scale-105 transition">
                            {/* Image */}
                            <img
                                src={anime.imagePath}
                                className="w-full h-60 object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <span className="bg-accent px-4 py-2 rounded text-sm font-medium">
                                    ▶ Watch
                                </span>
                            </div>

                            {/* Optional gradient bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black/70 to-transparent" />
                        </div>

                        {/* Title */}
                        <h3 className="text-sm mt-2 line-clamp-2 text-foreground/90 group-hover:text-foreground transition">
                            {anime.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    )
}
