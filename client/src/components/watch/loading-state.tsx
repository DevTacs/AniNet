export default function LoadingState() {
    return (
        <div className="min-h-screen px-6 py-10 flex flex-col items-center justify-center animate-pulse">
            {/* TOP SECTION */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT: META SKELETON */}
                <div className="space-y-5">
                    {/* Title */}
                    <div className="h-8 w-2/3 bg-white/10 rounded" />

                    {/* Subtitle */}
                    <div className="h-4 w-1/3 bg-white/10 rounded" />

                    {/* Genres */}
                    <div className="flex gap-2 flex-wrap">
                        <div className="h-6 w-16 bg-white/10 rounded-full" />
                        <div className="h-6 w-20 bg-white/10 rounded-full" />
                        <div className="h-6 w-14 bg-white/10 rounded-full" />
                    </div>

                    {/* Metadata lines */}
                    <div className="space-y-3 mt-4">
                        <div className="h-4 w-full bg-white/10 rounded" />
                        <div className="h-4 w-5/6 bg-white/10 rounded" />
                        <div className="h-4 w-4/6 bg-white/10 rounded" />
                        <div className="h-4 w-3/5 bg-white/10 rounded" />
                    </div>

                    {/* Synopsis */}
                    <div className="space-y-2 pt-4">
                        <div className="h-5 w-1/3 bg-white/10 rounded" />
                        <div className="h-4 w-full bg-white/10 rounded" />
                        <div className="h-4 w-11/12 bg-white/10 rounded" />
                        <div className="h-4 w-10/12 bg-white/10 rounded" />
                    </div>

                    {/* Button */}
                    <div className="h-10 w-40 bg-white/10 rounded-md mt-4" />
                </div>

                {/* RIGHT: IMAGE SKELETON */}
                <div className="flex justify-center md:justify-end">
                    <div className="w-full max-w-sm aspect-3/4 bg-white/10 rounded-xl shadow-lg border" />
                </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 mt-15">
                {/* PLAYER */}
                <div className="lg:col-span-2 aspect-video bg-white/10 rounded-xl" />

                {/* EPISODES */}
                <div className="space-y-3">
                    <div className="h-6 w-1/2 bg-white/10 rounded" />

                    {Array.from({length: 8}).map((_, i) => (
                        <div
                            key={i}
                            className="h-12 w-full bg-white/10 rounded-md"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
