import {PackageOpen} from "lucide-react"

export default function EmptyState() {
    return (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-3">
                <PackageOpen />
            </div>

            <h2 className="text-lg font-semibold text-white">No anime found</h2>

            <p className="text-sm text-muted-foreground mt-1 max-w-md">
                The anime you’re looking for doesn’t exist or was removed.
            </p>
        </div>
    )
}
