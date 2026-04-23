import {Link, Outlet, createRootRoute} from "@tanstack/react-router"
import React from "react"

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <React.Fragment>
            <div className="hidden md:flex gap-4 justify-between bg-background py-4 px-20 border-2 border-b-foreground">
                <span className="text-2xl text-foreground">
                    Ani<span className="text-accent">Net</span>
                </span>
                <nav className=" flex gap-10 justify-end">
                    <Link to="/anime" className="text-accent">
                        Anime
                    </Link>
                    <Link to="/anime" className="text-foreground">
                        Manga
                    </Link>
                </nav>
            </div>

            <div className="md:hidden">{/* Sheet hamburger menu here */}</div>
            <div className="bg-background text-foreground">
                <Outlet />
            </div>
        </React.Fragment>
    )
}
