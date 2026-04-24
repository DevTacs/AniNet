import UserAvatarMenu from "@/components/avatar-menu"
import {Link, Outlet, createRootRoute} from "@tanstack/react-router"
import React from "react"

export const Route = createRootRoute({
    component: RootComponent,
})
function RootComponent() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

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
                        to="/anime/all"
                        className="text-sm text-foreground/70 hover:text-foreground transition"
                        activeProps={{
                            className:
                                "text-foreground font-semibold border-b-2 border-accent pb-1",
                        }}>
                        Browse
                    </Link>

                    {isLoggedIn && (
                        <Link
                            to="/anime"
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
                        {!isLoggedIn && (
                            <button className="bg-accent text-foreground px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent/80 transition">
                                Login
                            </button>
                        )}

                        {isLoggedIn && <UserAvatarMenu />}
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
