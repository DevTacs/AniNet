import {Search, X} from "lucide-react"

type SearchBarProps = {
    search: string
    setSearch: (search: string) => void
    isFetching: boolean
}

export default function SearchBar({
    search,
    setSearch,
    isFetching,
}: SearchBarProps) {
    return (
        <div className="w-full flex justify-center mb-6">
            <div className="relative w-full max-w-xl">
                {/* Icon */}
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

                {/* Input */}
                <input
                    type="text"
                    placeholder="Search anime (e.g. Naruto, One Piece...)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl 
                        bg-white/5 border border-white/10 
                        text-sm outline-none
                        focus:ring-2 focus:ring-accent 
                        focus:border-accent
                        transition-all"
                />

                {/* Clear button */}
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition">
                        <X className="size-4" />
                    </button>
                )}

                {/* Loading indicator */}
                {isFetching && (
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 text-xs text-muted-foreground animate-pulse">
                        ...
                    </div>
                )}
            </div>
        </div>
    )
}
