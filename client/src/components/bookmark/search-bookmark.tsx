type SearchBookmarkProps = {
    search: string
    setSearch: (search: string) => void
}

export default function SearchBookmark({
    search,
    setSearch,
}: SearchBookmarkProps) {
    return (
        <div className="flex justify-end gap-3">
            <input
                type="text"
                placeholder="Search anime..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="w-75 border border-white/10 bg-white/5 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-accent transition"
            />
        </div>
    )
}
