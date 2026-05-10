export default function BookmarkSkeleton() {
    return (
        <>
            {Array.from({length: 10}).map((_, i) => (
                <div className="animate-pulse" key={i}>
                    <div className="rounded-xl bg-white/5 h-60 w-full" />
                    <div className="mt-2 h-4 bg-white/10 rounded w-3/4" />
                    <div className="mt-2 h-4 bg-white/10 rounded w-1/2" />
                </div>
            ))}
        </>
    )
}
