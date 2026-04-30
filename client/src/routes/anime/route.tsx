import UserAvatarMenu from "@/components/avatar-menu"
import {api} from "@/configs/axios.config"
import {
    Link,
    Outlet,
    createRootRoute,
    useNavigate,
} from "@tanstack/react-router"
import {Menu, X} from "lucide-react"
import {useState} from "react"

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
    const [open, setOpen] = useState(false)

    const handleOnLoginClick = () => navigate({to: "/auth/login"})

    return (
        <>
            {/* 🔝 NAVBAR */}
            <header className="bg-background border-b border-white/10 backdrop-blur">
                <div className="flex items-center justify-between px-4 md:px-20 py-4">
                    {/* Logo */}
                    <span className="text-2xl font-bold tracking-wide text-foreground">
                        Ani<span className="text-accent">Net</span>
                    </span>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            to="/anime/browse"
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

                        <div className="flex items-center gap-4 ml-6">
                            {!data && (
                                <button
                                    className="bg-accent px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent/80 transition"
                                    onClick={handleOnLoginClick}>
                                    Login
                                </button>
                            )}

                            {data && <UserAvatarMenu data={data} />}
                        </div>
                    </nav>

                    {/* MOBILE BUTTON */}
                    <button
                        className="md:hidden"
                        onClick={() => setOpen((prev) => !prev)}>
                        {open ? (
                            <X className="size-6 text-accent" />
                        ) : (
                            <Menu className="size-6 text-accent" />
                        )}
                    </button>
                </div>

                {/* 📱 MOBILE MENU */}
                {open && (
                    <div className="md:hidden px-4 pb-4 space-y-3 border-t border-white/10">
                        <Link
                            to="/anime/browse"
                            onClick={() => setOpen(false)}
                            className="block text-sm py-2 text-foreground/70 hover:text-foreground">
                            Browse
                        </Link>

                        {data && (
                            <Link
                                to="/anime/bookmark"
                                onClick={() => setOpen(false)}
                                className="block text-sm py-2 text-foreground/70 hover:text-foreground">
                                Bookmarks
                            </Link>
                        )}

                        {!data && (
                            <button
                                className="w-full bg-accent py-2 rounded-lg text-sm font-medium"
                                onClick={() => {
                                    setOpen(false)
                                    handleOnLoginClick()
                                }}>
                                Login
                            </button>
                        )}

                        {data && (
                            <div className="pt-2">
                                <UserAvatarMenu data={data} />
                            </div>
                        )}
                    </div>
                )}
            </header>

            {/* 📱 CONTENT */}
            <main className="bg-background text-foreground min-h-screen">
                <Outlet />
            </main>
        </>
    )
}
