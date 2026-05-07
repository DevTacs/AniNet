import type {AnimeInfo} from "@/types/anime.type"

export default function ImagePanel({data}: {data?: AnimeInfo}) {
    return (
        <div className="flex justify-center md:justify-end">
            <div className="rounded-xl overflow-hidden shadow-lg border max-w-sm">
                <img
                    src={data?.imagePath}
                    alt={data?.name}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}
