import CategoryBookmark from "@/components/bookmark/category-bookmark"
import SearchBookmark from "@/components/bookmark/search-bookmark"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {api} from "@/configs/axios.config"
import {useAnimeBookmark} from "@/hooks/bookmark/bookmark.hook"
import {useSearchBookmark} from "@/hooks/bookmark/search-bookmark-hook"
import {createFileRoute, redirect, useNavigate} from "@tanstack/react-router"
import {PlayIcon} from "lucide-react"
import {useState} from "react"

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

    const {
        search,
        setSearch,
        debounceSearch,
        selectCategory,
        setSelectedCategory,
    } = useSearchBookmark({
        genre: genre[0],
        setPage,
    })

    const {data, isFetching} = useAnimeBookmark({
        page,
        debounceSearch,
        selectCategory,
    })

    return (
        <div className="min-h-screen px-10 py-6 bg-background text-foreground">
            {/* 🔍 Search */}
            <SearchBookmark search={search} setSearch={setSearch} />

            {/* 🎯 Category */}
            <CategoryBookmark
                genre={genre}
                selectCategory={selectCategory}
                setSelectedCategory={setSelectedCategory}
            />

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
            <div className="mt-10 flex justify-center">
                <div className="w-full max-w-full overflow-x-auto">
                    <Pagination className="flex w-max gap-2 px-2 whitespace-nowrap">
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
                                                data?.pagination?.totalPages ||
                                                    1,
                                            ),
                                        )
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}
