import FeaturedCards from "@/components/featured-cards"
import {createFileRoute} from "@tanstack/react-router"
import FeaturedSkeleton from "@/components/browse/skeleton-loader"
import SearchBar from "@/components/browse/search-bar"
import BrowsePagination from "@/components/browse/pagination"
import {useBrowsePagination} from "@/hooks/browse/pagination.hook"
import {useSearch} from "@/hooks/browse/search.hook"
import {useFeaturedAnime} from "@/hooks/browse/featured-anime.hook"

export const Route = createFileRoute("/anime/browse")({
    component: RouteComponent,
})

function RouteComponent() {
    const {search, setSearch, debouncedSearch} = useSearch()
    const {page, setPage, pages, setPages} = useBrowsePagination({
        resetKey: debouncedSearch,
    })
    const {
        data = [],
        isLoading,
        isFetching,
    } = useFeaturedAnime({
        debouncedSearch,
        page,
    })

    return (
        <div className="min-h-screen p-6 lg:p-10">
            <SearchBar
                search={search}
                setSearch={setSearch}
                isFetching={isFetching}
            />

            {data && isLoading ? (
                <FeaturedSkeleton />
            ) : (
                <FeaturedCards data={data} />
            )}

            {data.length > 0 && (
                <BrowsePagination
                    page={page}
                    setPage={setPage}
                    pages={pages}
                    setPages={setPages}
                />
            )}
        </div>
    )
}
