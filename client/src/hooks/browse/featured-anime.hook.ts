import {getFeaturedAnimeAsync} from "@/services/anime.service"
import type {AnimeDetails} from "@/types/anime.type"
import {useQuery} from "@tanstack/react-query"

type UseFeaturedAnimeOptions = {
    debouncedSearch: string
    page: number
}
export function useFeaturedAnime({
    debouncedSearch,
    page,
}: UseFeaturedAnimeOptions) {
    const {
        data = [],
        isLoading,
        isFetching,
    } = useQuery<AnimeDetails[]>({
        queryKey: ["anime", "featured", page, debouncedSearch],
        queryFn: () => getFeaturedAnimeAsync(debouncedSearch, page),
    })

    return {data, isLoading, isFetching}
}
