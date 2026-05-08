type CategoryBookmarkProps = {
    genre: string[]
    selectCategory: string
    setSelectedCategory: (category: string) => void
}
export default function CategoryBookmark({
    genre,
    selectCategory,
    setSelectedCategory,
}: CategoryBookmarkProps) {
    return (
        <div className="flex flex-wrap gap-3 mt-8">
            {genre.map((g, index) => (
                <button
                    key={index}
                    onClick={() => setSelectedCategory(g)}
                    className={`px-4 py-1.5 rounded-full border text-sm transition ${
                        selectCategory === g
                            ? "bg-accent text-white border-accent"
                            : "border-white/10 bg-white/5 hover:bg-accent hover:text-white"
                    }`}>
                    {g}
                </button>
            ))}
        </div>
    )
}
