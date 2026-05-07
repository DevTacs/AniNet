import type {AnimeInfo} from "@/types/anime.type"

type AuthUser = {
    id: string
    username: string
    email: string
    avatar: string
}

type AnimeMetaDataProps = {
    data?: AnimeInfo
    authData: AuthUser
    isPending: boolean
    isBookmarked: boolean
    handleOnBookmarkClickAsync: () => void
}

export default function AnimeMetaData({
    data,
    authData,
    isPending,
    isBookmarked,
    handleOnBookmarkClickAsync,
}: AnimeMetaDataProps) {
    return (
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
                    <span className="font-semibold">Aired:</span> {data?.aired}
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
                    disabled={isPending}
                    className={`py-2 px-4 rounded-md transition ${
                        isBookmarked
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-accent hover:bg-accent/80"
                    } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => handleOnBookmarkClickAsync()}>
                    {isBookmarked ? "Remove Bookmark" : "Bookmark"}
                </button>
            )}
        </div>
    )
}
