import {getAnimeByIdAsync} from "@/services/anime.service"
import type {AnimeInfo} from "@/types/anime.type"
import {useQuery} from "@tanstack/react-query"
import {createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute("/anime/$id")({
    component: RouteComponent,
})

function RouteComponent() {
    const {id} = Route.useParams()
    const {data} = useQuery<AnimeInfo>({
        queryKey: ["anime", id],
        queryFn: () => getAnimeByIdAsync(Number(id)),
    })

    return (
        <div className="min-h-screen bg-background px-6 py-10 flex justify-center">
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
                    </div>

                    <div className="pt-4">
                        <h2 className="font-semibold text-lg mb-2">Synopsis</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {data?.description}
                        </p>
                    </div>
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
        </div>
    )
}
