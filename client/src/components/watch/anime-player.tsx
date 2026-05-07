export default function AnimePlayer({
    selectedEpisode,
}: {
    selectedEpisode: string
}) {
    return (
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
    )
}
