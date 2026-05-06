import React from "react"
import Navigation from "./navigation"
import {Button} from "../ui/button"
import UserAvatarMenu from "../avatar-menu"

type AuthUser = {
    id: string
    username: string
    email: string
    avatar: string
}

type DesktopLayoutProps = {
    data: AuthUser
    handleOnLoginClick: () => void
    openCall: boolean
    setOpenCall: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DesktopLayout({
    data,
    handleOnLoginClick,
    openCall,
    setOpenCall,
}: DesktopLayoutProps) {
    return (
        <nav className="hidden md:flex items-center gap-8">
            <Navigation label="Browse" path="/anime/browse" />
            {data && (
                <>
                    <Navigation label="Bookmarks" path="/anime/bookmark" />
                    <Button
                        onClick={() => setOpenCall(!openCall)}
                        className="text-sm bg-accent text-foreground hover:bg-accent/80 transition">
                        Watch together
                    </Button>
                </>
            )}

            <div className="flex items-center gap-4 ml-6">
                {!data && (
                    <button
                        className="bg-accent px-5 py-2 rounded-lg text-sm text-foreground font-medium hover:bg-accent/80 transition"
                        onClick={handleOnLoginClick}>
                        Login
                    </button>
                )}

                {data && <UserAvatarMenu data={data} />}
            </div>
        </nav>
    )
}
