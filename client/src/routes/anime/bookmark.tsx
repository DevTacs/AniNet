import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {api} from "@/configs/axios.config"
import {getAnimeBookmarksAsync} from "@/services/anime.service"
import {useQuery} from "@tanstack/react-query"
import {createFileRoute, redirect, useNavigate} from "@tanstack/react-router"
import {PlayIcon} from "lucide-react"
import {useEffect, useState} from "react"
import {useDebounce} from "use-debounce"

type AnimeDetails = {
    _id: string
    user: string
    animeId: string
    name: string
    imagePath: string
    genre: string[]
}

export const Route = createFileRoute("/anime/bookmark")({
    component: RouteComponent,
    loader: async () => {
        const response = await api.get("/auth/authenticated")
        if (!response.data) throw redirect({to: "/auth/login"})
        return response.data
    },
})

function RouteComponent() {
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const genre: string[] = [
        "all",
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

    const [search, setSearch] = useState("")
    const [debounceSearch] = useDebounce(search, 500)
    const [selectCategory, setSelectedCategory] = useState(genre[0])

    const {data, isFetching} = useQuery({
        queryKey: ["bookmarks", page, debounceSearch, selectCategory],
        queryFn: () =>
            getAnimeBookmarksAsync(debounceSearch, page, selectCategory),
    })

    useEffect(() => {
        setPage(1)
    }, [debounceSearch, selectCategory])

    return (
        <div className="min-h-screen px-10 py-6 bg-background text-foreground">
            {/* 🔍 Search */}
            <div className="flex justify-end gap-3">
                <input
                    type="text"
                    placeholder="Search anime..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    className="w-75 border border-white/10 bg-white/5 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-accent transition"
                />
            </div>

            {/* 🎯 Category */}
            <div className="flex flex-wrap gap-3 mt-8">
                {genre.map((g, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedCategory(g)}
                        className={`px-4 py-1.5 rounded-full border text-sm transition ${
                            selectCategory === g
                                ? "bg-accent text-white border-accent"
                                : "border-white/10 bg-white/5 hover:bg-accent hover:text-white"
                        }`}>
                        {g}
                    </button>
                ))}
            </div>

            {/* 🎬 Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 mt-10">
                {isFetching && (
                    <p className="col-span-full text-center text-muted-foreground">
                        Loading...
                    </p>
                )}

                {data?.data?.length === 0 && (
                    <p className="col-span-full text-center text-muted-foreground">
                        No bookmarks found.
                    </p>
                )}

                {data &&
                    data?.map((anime: AnimeDetails) => (
                        <div
                            key={anime._id}
                            onClick={() =>
                                navigate({to: `/anime/watch/${anime.animeId}`})
                            }
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
                    ))}
            </div>

            {/* 📄 Pagination */}
            <Pagination className="mt-12 flex justify-center">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                setPage((prev) => Math.max(prev - 1, 1))
                            }
                        />
                    </PaginationItem>

                    {Array.from({
                        length: data?.pagination?.totalPages || 1,
                    }).map((_, i) => {
                        const p = i + 1
                        return (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    isActive={p === page}
                                    onClick={() => setPage(p)}
                                    className="cursor-pointer">
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                setPage((prev) =>
                                    Math.min(
                                        prev + 1,
                                        data?.pagination?.totalPages || 1,
                                    ),
                                )
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
