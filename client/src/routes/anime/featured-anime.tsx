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

    const {data} = useQuery<AnimeDetails[]>({
        queryKey: ["anime", "featured", page],
        queryFn: () => getFeaturedAnimeAsync(page),
    })

    return (
        <div className="min-h-screen p-6 lg:p-10">
            {/* FEATURED */}
            {data && <FeaturedCards data={data} />}

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

                        {/* Next (adds new page) */}
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
