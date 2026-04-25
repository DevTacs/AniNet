import UserAvatarMenu from "@/components/avatar-menu"
import {api} from "@/configs/axios.config"
import {
    Link,
    Outlet,
    createRootRoute,
    redirect,
    useNavigate,
} from "@tanstack/react-router"

export const Route = createRootRoute({
    component: RootComponent,
    loader: async () => {
        const response = await api.get("/auth/authenticated")
        return response.data
    },
})
function RootComponent() {
    const data = Route.useLoaderData()
    const navigate = useNavigate()

    const handleOnLoginClick = () => navigate({to: "/auth/login"})

    return (
        <>
            {/* 🔝 Navbar */}
            <header className="hidden md:flex items-center justify-between px-20 py-4 bg-background border-b border-white/10 backdrop-blur">
                {/* Logo */}
                <span className="text-2xl font-bold tracking-wide text-foreground">
                    Ani<span className="text-accent">Net</span>
                </span>

                {/* Navigation */}
                <nav className="flex items-center gap-8">
                    <Link
                        to="/anime/featured-anime"
                        className="text-sm text-foreground/70 hover:text-foreground transition"
                        activeProps={{
                            className:
                                "text-foreground font-semibold border-b-2 border-accent pb-1",
                        }}>
                        Featured
                    </Link>

                    <Link
                        to="/anime"
                        className="text-sm text-foreground/70 hover:text-foreground transition"
                        activeProps={{
                            className:
                                "text-foreground font-semibold border-b-2 border-accent pb-1",
                        }}>
                        Browse
                    </Link>

                    {data && (
                        <Link
                            to="/anime/bookmark"
                            className="text-sm text-foreground/70 hover:text-foreground transition"
                            activeProps={{
                                className:
                                    "text-foreground font-semibold border-b-2 border-accent pb-1",
                            }}>
                            Bookmarks
                        </Link>
                    )}

                    {/* Right side */}
                    <div className="flex items-center gap-4 ml-6">
                        {!data && (
                            <button
                                className="bg-accent text-foreground px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent/80 transition"
                                onClick={handleOnLoginClick}>
                                Login
                            </button>
                        )}

                        {data && <UserAvatarMenu />}
                    </div>
                </nav>
            </header>

            {/* 📱 Mobile */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-background">
                <span className="font-bold">
                    Ani<span className="text-accent">Net</span>
                </span>
                {/* TODO: hamburger menu */}
            </div>

            {/* Content */}
            <main className="bg-background text-foreground min-h-screen">
                <Outlet />
            </main>
        </>
    )
}
