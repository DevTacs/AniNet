import BookmarkCard from "@/components/bookmark/bookmark-card"
import CategoryBookmark from "@/components/bookmark/category-bookmark"
import EmptyState from "@/components/bookmark/empty-state"
import SearchBookmark from "@/components/bookmark/search-bookmark"
import BookmarkSkeleton from "@/components/bookmark/skeleton-loader"
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
import {createFileRoute, redirect} from "@tanstack/react-router"
import {useState} from "react"

export const Route = createFileRoute("/anime/bookmark")({
    component: RouteComponent,
    loader: async () => {
        const response = await api.get("/auth/authenticated")
        if (!response.data) throw redirect({to: "/auth/login"})
        return response.data
    },
})

type AnimeDetails = {
    _id: string
    user: string
    animeId: string
    name: string
    imagePath: string
    genre: string[]
}

function RouteComponent() {
    const [page, setPage] = useState(1)
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
            {data && data.length === 0 && <EmptyState />}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 mt-10">
                {isFetching && <BookmarkSkeleton />}
                {data &&
                    data.map((anime: AnimeDetails) => (
                        <BookmarkCard key={anime._id} anime={anime} />
                    ))}
            </div>

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
