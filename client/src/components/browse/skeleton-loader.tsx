export default function FeaturedSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
            {Array.from({length: 10}).map((_, i) => (
                <div
                    key={i}
                    className="animate-pulse bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="h-60 bg-white/10" />
                    <div className="p-3 space-y-2">
                        <div className="h-3 w-3/4 bg-white/10 rounded" />
                        <div className="h-3 w-1/2 bg-white/10 rounded" />
                    </div>
                </div>
            ))}
        </div>
    )
}
