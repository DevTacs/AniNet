import {useState} from "react"
import {useDebounce} from "use-debounce"

export function useSearch() {
    const [search, setSearch] = useState("")
    const [debouncedSearch] = useDebounce(search, 500)

    return {search, setSearch, debouncedSearch}
}
