import {useNavigate} from "@tanstack/react-router"
import {PlayIcon} from "lucide-react"

type AnimeDetails = {
    _id: string
    user: string
    animeId: string
    name: string
    imagePath: string
    genre: string[]
}

export default function BookmarkCard({anime}: {anime: AnimeDetails}) {
    const navigate = useNavigate()
    return (
        <div
            key={anime._id}
            onClick={() => navigate({to: `/anime/watch/${anime.animeId}`})}
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
                    <span className="bg-accent px-4 py-2 rounded text-sm font-medium flex flex-row items-center">
                        <PlayIcon className="w-4 h-4 mr-2" />
                        <span>Watch</span>
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
    )
}
