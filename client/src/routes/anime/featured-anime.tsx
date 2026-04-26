import FeaturedCards from "@/components/featured-cards"
import {getFeaturedAnimeAsync} from "@/services/anime.service"
import type {AnimeDetails} from "@/types/anime.type"
import {useQuery} from "@tanstack/react-query"
import {createFileRoute} from "@tanstack/react-router"
import {useEffect, useState} from "react"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export const Route = createFileRoute("/anime/featured-anime")({
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
    // ✔ restore selected page
    const [page, setPage] = useState<number>(() => {
        return Number(localStorage.getItem("featured-page")) || 1
    })

    // ✔ restore pages array
    const [pages, setPages] = useState<number[]>(() => {
        const stored = localStorage.getItem("featured-pages")
        return stored ? JSON.parse(stored) : [1]
    })

    // ✔ persist selected page
    useEffect(() => {
        localStorage.setItem("featured-page", String(page))
    }, [page])

    // ✔ persist pages array
    useEffect(() => {
        localStorage.setItem("featured-pages", JSON.stringify(pages))
    }, [pages])

    const {data, isLoading, isFetching} = useQuery<AnimeDetails[]>({
        queryKey: ["anime", "featured", page],
        queryFn: () => getFeaturedAnimeAsync(page),
    })

    return (
        <div className="min-h-screen p-6 lg:p-10">
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
            {/* FEATURED */}
            {isLoading ? (
                <FeaturedSkeleton />
            ) : (
                <>
                    {isFetching && <div className="opacity-50 transition" />}
                    {data && <FeaturedCards data={data} />}
                </>
            )}

            {/* PAGINATION */}
            <div className="mt-10 flex justify-center">
                <Pagination>
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

                        {/* Pages (progressive) */}
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
    )
}
