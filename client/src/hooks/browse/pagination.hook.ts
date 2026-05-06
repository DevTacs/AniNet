import {useEffect, useState} from "react"

type UseBrowsePaginationOptions = {
    resetKey: string
}

export function useBrowsePagination({resetKey}: UseBrowsePaginationOptions) {
    const [page, setPage] = useState<number>(() => {
        return Number(localStorage.getItem("featured-page")) || 1
    })

    const [pages, setPages] = useState<number[]>(() => {
        const stored = localStorage.getItem("featured-pages")
        return stored ? JSON.parse(stored) : [1]
    })

    //persist current page
    useEffect(() => {
        localStorage.setItem("featured-page", String(page))
    }, [page])

    //persist current pages
    useEffect(() => {
        localStorage.setItem("featured-pages", JSON.stringify(pages))
    }, [pages])

    //reset page and pages when search changes
    useEffect(() => {
        setPage(1)
        setPages([1])
    }, [resetKey])

    return {
        page,
        setPage,
        pages,
        setPages,
    }
}
