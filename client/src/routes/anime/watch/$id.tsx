import AnimeEpisodes from "@/components/watch/anime-episode"
import AnimeMetaData from "@/components/watch/anime-metadata"
import AnimePlayer from "@/components/watch/anime-player"
import EmptyState from "@/components/watch/empty-state"
import ImagePanel from "@/components/watch/image-panel"
import LoadingState from "@/components/watch/loading-state"
import {api} from "@/configs/axios.config"
import {useAddBookmark} from "@/hooks/watch/add-bookmark.hook"
import {useAnimeEpisodes} from "@/hooks/watch/anime-episodes"
import {useAnime} from "@/hooks/watch/anime.hook"
import {useCheckBookmark} from "@/hooks/watch/check-bookmark.hook"
import {createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute("/anime/watch/$id")({
    component: RouteComponent,
    loader: async () => {
        const response = await api.get("/auth/authenticated")
        return response.data
    },
})

function RouteComponent() {
    const authData = Route.useLoaderData()
    const {id} = Route.useParams()
    const {data, isLoading, isError} = useAnime({id})
    const {isBookmarked} = useCheckBookmark({id})
    const {episodes, selectedEpisode, setSelectedEpisode} = useAnimeEpisodes({
        id,
    })
    const {mutateAsync, isPending} = useAddBookmark({id})

    const handleOnBookmarkClickAsync = async () => {
        try {
            const payload = {
                animeId: Number(id),
            }
            await mutateAsync(payload)
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) return <LoadingState />

    if (isError || !data) return <EmptyState />

    return (
        <div className="min-h-screen bg-background px-6 py-10 flex flex-col items-center justify-center">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
                <AnimeMetaData
                    data={data}
                    authData={authData}
                    isPending={isPending}
                    isBookmarked={isBookmarked}
                    handleOnBookmarkClickAsync={handleOnBookmarkClickAsync}
                />
                <ImagePanel data={data} />
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 mt-15">
                <AnimePlayer selectedEpisode={selectedEpisode} />
                <AnimeEpisodes
                    episodes={episodes}
                    selectedEpisode={selectedEpisode}
                    setSelectedEpisode={setSelectedEpisode}
                />
            </div>
        </div>
    )
}
