import FeaturedCards from "@/components/featured-cards"
import {getFeaturedAnimeAsync} from "@/services/anime.service"
import type {AnimeDetails} from "@/types/anime.type"
import {useQuery} from "@tanstack/react-query"
import {createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute("/anime/featured-anime")({
    component: RouteComponent,
})

function RouteComponent() {
    const {data} = useQuery<AnimeDetails[]>({
        queryKey: ["anime", "featured"],
        queryFn: getFeaturedAnimeAsync,
    })

    return (
        <div className="min-h-screen p-6 lg:p-10">
            {/* FEATURED */}
            {data && <FeaturedCards data={data} />}
        </div>
    )
}
