import FeaturedCards from "@/components/featured-cards"
import {getFeaturedAnimeAsync} from "@/services/anime.service"
import type {AnimeDetails} from "@/types/anime.type"
import {useQuery} from "@tanstack/react-query"
import {createFileRoute} from "@tanstack/react-router"
import {useEffect, useState} from "react"
import {useDebounce} from "use-debounce"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {PackageOpen, Search, X} from "lucide-react"

export const Route = createFileRoute("/anime/browse")({
    component: RouteComponent,
})

function FeaturedSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
            {Array.from({length: 10}).map((_, i) => (
                <div
                    key={i}
                    className="animate-pulse bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="h-60 bg-white/10" />
                    <div className="p-3 space-y-2">
                        <div className="h-3 w-3/4 bg-white/10 rounded" />
                        <div className="h-3 w-1/2 bg-white/10 rounded" />
                    </div>
                </div>
            ))}
        </div>
    )
}

function RouteComponent() {
    const [search, setSearch] = useState("")
    const [debouncedSearch] = useDebounce(search, 500)

    // ✔ restore page
    const [page, setPage] = useState<number>(() => {
        return Number(localStorage.getItem("featured-page")) || 1
    })

    // ✔ restore pagination pages
    const [pages, setPages] = useState<number[]>(() => {
        const stored = localStorage.getItem("featured-pages")
        return stored ? JSON.parse(stored) : [1]
    })

    // ✔ persist page
    useEffect(() => {
        localStorage.setItem("featured-page", String(page))
    }, [page])

    // ✔ persist pages
    useEffect(() => {
        localStorage.setItem("featured-pages", JSON.stringify(pages))
    }, [pages])

    // 🔁 reset page when searching
    useEffect(() => {
        setPage(1)
        setPages([1])
    }, [debouncedSearch])

    const {
        data = [],
        isLoading,
        isFetching,
    } = useQuery<AnimeDetails[]>({
        queryKey: ["anime", "featured", page, debouncedSearch],
        queryFn: () => getFeaturedAnimeAsync(debouncedSearch, page),
    })

    return (
        <div className="min-h-screen p-6 lg:p-10">
            {/* SEARCH BAR */}
            <div className="w-full flex justify-center mb-6">
                <div className="relative w-full max-w-xl">
                    {/* Icon */}
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Search anime (e.g. Naruto, One Piece...)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl 
                        bg-white/5 border border-white/10 
                        text-sm outline-none
                        focus:ring-2 focus:ring-accent 
                        focus:border-accent
                        transition-all"
                    />

                    {/* Clear button */}
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition">
                            <X className="size-4" />
                        </button>
                    )}

                    {/* Loading indicator */}
                    {isFetching && (
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-xs text-muted-foreground animate-pulse">
                            ...
                        </div>
                    )}
                </div>
            </div>

            {/* FEATURED */}
            {data && isLoading ? (
                <FeaturedSkeleton />
            ) : (
                <>
                    {data.length > 0 && <FeaturedCards data={data} />}

                    {data.length === 0 && !isLoading && (
                        <div className="mt-16 flex flex-col items-center justify-center text-center">
                            <div className="text-4xl mb-3">
                                <PackageOpen />
                            </div>

                            <h2 className="text-lg font-semibold text-white">
                                No anime found
                            </h2>

                            <p className="text-sm text-muted-foreground mt-1 max-w-md">
                                We couldn’t find anything matching your search.
                                Try different keywords or clear your filter.
                            </p>
                        </div>
                    )}
                </>
            )}
            {/* PAGINATION */}
            {data.length > 0 && (
                <div className="mt-10 flex justify-center">
                    <div className="w-full max-w-full overflow-x-auto">
                        <Pagination className="flex w-max gap-2 px-2 whitespace-nowrap">
                            <PaginationContent>
                                {/* Prev */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        className={
                                            page === 1
                                                ? "opacity-50 pointer-events-none"
                                                : "cursor-pointer"
                                        }
                                        onClick={() =>
                                            setPage((p) => Math.max(p - 1, 1))
                                        }
                                    />
                                </PaginationItem>

                                {/* Pages */}
                                {pages.map((p) => (
                                    <PaginationItem key={p}>
                                        <PaginationLink
                                            isActive={p === page}
                                            onClick={() => setPage(p)}
                                            className={
                                                p === page
                                                    ? "bg-accent text-white"
                                                    : "cursor-pointer"
                                            }>
                                            {p}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {/* Next */}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => {
                                            const nextPage = page + 1

                                            setPage(nextPage)

                                            setPages((prev) =>
                                                prev.includes(nextPage)
                                                    ? prev
                                                    : [...prev, nextPage],
                                            )
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            )}
        </div>
    )
}
