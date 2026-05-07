import {getAnimeByIdAsync} from "@/services/anime.service"
import type {AnimeInfo} from "@/types/anime.type"
import {useQuery} from "@tanstack/react-query"

export function useAnime({id}: {id: string}) {
    const {data, isLoading, isError, error} = useQuery<AnimeInfo>({
        queryKey: ["anime", id],
        queryFn: async () => {
            try {
                const res = await getAnimeByIdAsync(Number(id))
                console.log(res)
                return res
            } catch (error) {
                console.log(error)
                throw error
            }
        },
    })

    return {data, isLoading, isError, error}
}
