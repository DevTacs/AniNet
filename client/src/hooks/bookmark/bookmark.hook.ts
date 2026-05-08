import {getAnimeBookmarksAsync} from "@/services/anime.service"
import {useQuery} from "@tanstack/react-query"

type AnimeBookmarkOptions = {
    page: number
    debounceSearch: string
    selectCategory: string
}

export function useAnimeBookmark({
    page,
    debounceSearch,
    selectCategory,
}: AnimeBookmarkOptions) {
    const {data, isFetching} = useQuery({
        queryKey: ["bookmarks", page, debounceSearch, selectCategory],
        queryFn: () =>
            getAnimeBookmarksAsync(debounceSearch, page, selectCategory),
    })

    return {data, isFetching}
}
