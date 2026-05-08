import {useEffect, useState} from "react"
import {useDebounce} from "use-debounce"

type SearchBookmarkOptions = {
    genre: string
    setPage: (page: number) => void
}

export function useSearchBookmark({genre, setPage}: SearchBookmarkOptions) {
    const [search, setSearch] = useState("")
    const [debounceSearch] = useDebounce(search, 500)
    const [selectCategory, setSelectedCategory] = useState(genre)

    useEffect(() => {
        setPage(1)
    }, [debounceSearch, selectCategory])

    return {
        search,
        setSearch,
        debounceSearch,
        selectCategory,
        setSelectedCategory,
    }
}
