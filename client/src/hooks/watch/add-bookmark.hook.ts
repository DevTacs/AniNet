import {toggleAnimeBookmarkAsync} from "@/services/anime.service"
import {useMutation, useQueryClient} from "@tanstack/react-query"

export function useAddBookmark({id}: {id: string}) {
    const queryClient = useQueryClient()

    const {mutateAsync, isPending} = useMutation({
        mutationKey: ["bookmark"],
        mutationFn: async ({animeId}: {animeId: number}) =>
            toggleAnimeBookmarkAsync(animeId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["bookmark", id],
            })
        },
    })

    return {mutateAsync, isPending}
}
