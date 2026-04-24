import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {useNavigate, createFileRoute} from "@tanstack/react-router"
import {useState} from "react"

export const Route = createFileRoute("/anime/all")({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const genre: string[] = [
        "action",
        "romance",
        "harem",
        "ecchi",
        "fantasy",
        "school",
        "drama",
        "supernatural",
        "comedy",
        "adventure",
        "shounen",
        "magic",
    ]
    return (
        <div className="min-h-screen px-10 py-6 bg-background text-foreground">
            {/* 🔍 Search */}
            <div className="flex justify-end gap-3">
                <input
                    type="text"
                    placeholder="Search anime..."
                    className="w-[300px] border border-white/10 bg-white/5 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-accent transition"
                />
                <button className="bg-accent px-5 py-2 rounded-lg font-medium hover:bg-accent/80 transition">
                    Search
                </button>
            </div>

            {/* 🎭 Genre filter */}
            <div className="flex flex-wrap gap-3 mt-8">
                {genre.map((g, index) => (
                    <button
                        key={index}
                        className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm hover:bg-accent hover:text-white transition">
                        {g}
                    </button>
                ))}
            </div>

            {/* 🎬 Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 mt-10">
                {Array.from({length: 14}).map((_, i) => (
                    <div
                        key={i}
                        className="group relative bg-white/5 rounded-xl overflow-hidden hover:scale-105 transition">
                        {/* Thumbnail */}
                        <div className="h-40 bg-muted flex items-center justify-center text-sm">
                            Img
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <button className="bg-accent px-3 py-1 rounded text-sm">
                                ▶ Watch
                            </button>
                        </div>

                        {/* Title */}
                        <div className="p-2 text-sm truncate">
                            Anime Title {i + 1}
                        </div>
                    </div>
                ))}
            </div>

            {/* 📄 Pagination */}
            <Pagination className="mt-12 flex justify-center">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                setPage((prev) => Math.max(prev - 1, 1))
                            }
                        />
                    </PaginationItem>

                    {[1, 2, 3].map((p) => (
                        <PaginationItem key={p}>
                            <PaginationLink
                                isActive={p === page}
                                onClick={() => setPage(p)}
                                className="cursor-pointer">
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                setPage((prev) => Math.min(prev + 1, 3))
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
