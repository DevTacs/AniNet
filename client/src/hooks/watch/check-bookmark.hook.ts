import {checkBookmarkAsync} from "@/services/anime.service"
import {useQuery} from "@tanstack/react-query"

export function useCheckBookmark({id}: {id: string}) {
    const {data: isBookmarked} = useQuery({
        queryKey: ["bookmark", id],
        queryFn: () => checkBookmarkAsync(Number(id)),
    })

    return {isBookmarked}
}
