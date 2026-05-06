import React from "react"
import {Button} from "../ui/button"
import Navigation from "./navigation"
import UserAvatarMenu from "../avatar-menu"

type AuthUser = {
    id: string
    username: string
    email: string
    avatar: string
}

type MobileLayoutProps = {
    data: AuthUser
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleOnLoginClick: () => void
    openCall: boolean
    setOpenCall: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MobileLayout({
    data,
    setOpen,
    handleOnLoginClick,
    openCall,
    setOpenCall,
}: MobileLayoutProps) {
    return (
        <div className="md:hidden flex flex-col gap-2 pt-2 px-4 pb-4 space-y-3 border-t border-white/10">
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
    )
}
