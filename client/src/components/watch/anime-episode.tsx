import type {AnimeEpisode} from "@/types/anime.type"

export default function AnimeEpisodes({
    episodes,
    selectedEpisode,
    setSelectedEpisode,
}: {
    episodes?: AnimeEpisode[]
    selectedEpisode: string
    setSelectedEpisode: (episode: string) => void
}) {
    return (
        <div className="space-y-3">
            <h2 className="font-semibold text-lg">Episodes</h2>

            <div className="h-100 overflow-y-auto border rounded-xl p-2 space-y-2">
                {episodes?.map((ep) => {
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

                {episodes?.length && (
                    <p className="text-sm text-muted-foreground">
                        No episodes available.
                    </p>
                )}
            </div>
        </div>
    )
}
