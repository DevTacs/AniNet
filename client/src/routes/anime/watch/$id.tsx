import {api} from "@/configs/axios.config"
import {
    addAnimeBookmarkAsync,
    checkBookmarkAsync,
    getAnimeByIdAsync,
    getEpisodesByIdAsync,
} from "@/services/anime.service"
import type {AnimeEpisode, AnimeInfo} from "@/types/anime.type"
import {useMutation, useQuery} from "@tanstack/react-query"
import {createFileRoute} from "@tanstack/react-router"
import {useEffect, useState} from "react"

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

    const storageKey = `anime-${id}-episode`

    const [selectedEpisode, setSelectedEpisode] = useState<string | undefined>(
        () => localStorage.getItem(storageKey) || "",
    )

    const {data} = useQuery<AnimeInfo>({
        queryKey: ["anime", id],
        queryFn: () => getAnimeByIdAsync(Number(id)),
    })

    const {data: isBookmarked} = useQuery({
        queryKey: ["bookmark", id],
        queryFn: () => checkBookmarkAsync(Number(id)),
    })

    const {data: episodeData} = useQuery<AnimeEpisode[]>({
        queryKey: ["anime", id, "episodes"],
        queryFn: () => getEpisodesByIdAsync(Number(id)),
    })

    const {mutateAsync} = useMutation({
        mutationKey: ["bookmark"],
        mutationFn: async ({animeId}: {animeId: number}) =>
            addAnimeBookmarkAsync(animeId),
    })

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

    // ✅ Set first episode ONLY if nothing saved
    useEffect(() => {
        if (!selectedEpisode && episodeData && episodeData.length > 0) {
            setSelectedEpisode(episodeData[0].src)
        }
    }, [episodeData, selectedEpisode])

    // ✅ Save to localStorage whenever it changes
    useEffect(() => {
        if (selectedEpisode) {
            localStorage.setItem(storageKey, selectedEpisode)
        }
    }, [selectedEpisode, storageKey])

    return (
        <div className="min-h-screen bg-background px-6 py-10 flex flex-col items-center justify-center">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT: INFO */}
                <div className="space-y-5">
                    <div>
                        <h1 className="text-3xl font-bold">{data?.name}</h1>
                        <p className="text-muted-foreground mt-1">
                            {data?.premiered} • {data?.status}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {data?.genres?.map((g, i) => (
                            <span
                                key={i}
                                className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                                {g}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-2 text-sm leading-relaxed">
                        <p>
                            <span className="font-semibold">Aired:</span>{" "}
                            {data?.aired}
                        </p>
                        <p>
                            <span className="font-semibold">Studios:</span>{" "}
                            {data?.studios}
                        </p>
                        <p>
                            <span className="font-semibold">Duration:</span>{" "}
                            {data?.duration}
                        </p>
                        <p>
                            <span className="font-semibold">Ratings:</span>{" "}
                            {data?.ratingsNum}
                        </p>
                        <p>
                            <span className="font-semibold">Episodes:</span>{" "}
                            {data?.epCount}
                        </p>
                    </div>

                    <div className="pt-4">
                        <h2 className="font-semibold text-lg mb-2">Synopsis</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {data?.description}
                        </p>
                    </div>

                    {authData && (
                        <button
                            className={`bg-accent text-foreground hover:bg-accent/80 py-2 px-4 rounded-md ${
                                isBookmarked
                                    ? "bg-green-500 hover:bg-green-600"
                                    : ""
                            }`}
                            onClick={() => handleOnBookmarkClickAsync()}>
                            {isBookmarked ? "Remove Bookmark" : "Bookmark"}
                        </button>
                    )}
                </div>

                {/* RIGHT: IMAGE */}
                <div className="flex justify-center md:justify-end">
                    <div className="rounded-xl overflow-hidden shadow-lg border max-w-sm">
                        <img
                            src={data?.imagePath}
                            alt={data?.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* PLAYER + EPISODES */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 mt-15">
                {/* PLAYER */}
                <div className="lg:col-span-2 space-y-3">
                    <h2 className="font-semibold text-lg">Now Playing</h2>

                    <div className="w-full aspect-video rounded-xl overflow-hidden border shadow">
                        <iframe
                            className="w-full h-full"
                            src={selectedEpisode}
                            title="Anime Player"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* EPISODES */}
                <div className="space-y-3">
                    <h2 className="font-semibold text-lg">Episodes</h2>

                    <div className="h-100 overflow-y-auto border rounded-xl p-2 space-y-2">
                        {episodeData?.map((ep) => {
                            const isActive = selectedEpisode === ep.src

                            return (
                                <button
                                    key={ep.ep}
                                    onClick={() => setSelectedEpisode(ep.src)}
                                    className={`block w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                                        isActive
                                            ? "bg-primary text-accent"
                                            : "hover:bg-primary/10"
                                    }`}>
                                    Episode {ep.ep}
                                </button>
                            )
                        })}

                        {!episodeData?.length && (
                            <p className="text-sm text-muted-foreground">
                                No episodes available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
