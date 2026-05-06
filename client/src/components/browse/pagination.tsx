import type {Dispatch, SetStateAction} from "react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination"

type BrowsePaginationProps = {
    page: number
    setPage: (page: number) => void
    pages: number[]
    setPages: Dispatch<SetStateAction<number[]>>
}

export default function BrowsePagination({
    page,
    setPage,
    pages,
    setPages,
}: BrowsePaginationProps) {
    return (
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
                                onClick={() => setPage(Math.max(page - 1, 1))}
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
    )
}
