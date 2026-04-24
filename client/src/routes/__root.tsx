import UserAvatarMenu from "@/components/avatar-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Link, Outlet, createRootRoute} from "@tanstack/react-router"
import React from "react"

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(true)

    return (
        <React.Fragment>
            <div className="hidden md:flex gap-4 justify-between bg-background py-4 px-20 border-2 border-b-foreground">
                <span className="text-2xl text-foreground">
                    Ani<span className="text-accent">Net</span>
                </span>
                <nav className=" flex gap-10 justify-end">
                    <Link
                        to="/anime/featured-anime"
                        className="text-accent"
                        activeProps={{
                            className:
                                "text-foreground font-bold border-b-2 border-accent",
                        }}
                        activeOptions={{exact: true}}>
                        Featured Anime
                    </Link>

                    <Link
                        to="/anime"
                        className="text-accent"
                        activeProps={{
                            className:
                                "text-foreground font-bold border-b-2 border-accent",
                        }}
                        activeOptions={{exact: true}}>
                        All Anime
                    </Link>
                    {isLoggedIn ? (
                        <Link
                            to="/anime"
                            className="text-accent"
                            activeProps={{
                                className:
                                    "text-foreground font-bold border-b-2 border-accent",
                            }}
                            activeOptions={{exact: true}}>
                            Bookmarks
                        </Link>
                    ) : null}

                    {!isLoggedIn ? (
                        <button className="text-foreground bg-accent px-6 rounded-md">
                            Login
                        </button>
                    ) : null}
                    {isLoggedIn ? (
                        <div className="ml-20">
                            <UserAvatarMenu />{" "}
                        </div>
                    ) : null}
                </nav>
            </div>

            <div className="md:hidden">{/* Sheet hamburger menu here */}</div>
            <div className="bg-background text-foreground">
                <Outlet />
            </div>
        </React.Fragment>
    )
}
