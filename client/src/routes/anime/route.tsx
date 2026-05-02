import UserAvatarMenu from "@/components/avatar-menu"
import {Button} from "@/components/ui/button"
import {api} from "@/configs/axios.config"
import {
    Link,
    Outlet,
    createRootRoute,
    useNavigate,
} from "@tanstack/react-router"
import {Menu, X} from "lucide-react"

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
    const [openCall, setOpenCall] = useState(false)

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
                        {data && (
                            <Button onClick={() => setOpenCall(true)}>
                                Watch together
                            </Button>
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
                {openCall && <VideoCall />}
            </main>
        </>
    )
}

import {useEffect, useState} from "react"
import {JitsiMeeting} from "@jitsi/react-sdk"

const VideoCall = () => {
    const roomName = "my-room-123"
    const [minimized, setMinimized] = useState(false)

    useEffect(() => {
        // save room so we can recover after refresh
        localStorage.setItem("activeRoom", roomName)
    }, [])

    return (
        <div className="w-full h-screen bg-black relative">
            {/* TOP BAR (like GMeet) */}
            <div className="fixed top-3 right-3 z-50">
                <button
                    onClick={() => setMinimized(!minimized)}
                    className="bg-white text-black px-3 py-1 rounded shadow">
                    {minimized ? "Restore" : "Minimize"}
                </button>
            </div>

            {/* CALL CONTAINER */}
            <div
                className={`
          transition-all duration-300 ease-in-out
          ${
              minimized
                  ? "fixed bottom-4 right-4 w-[360px] h-[220px] rounded-xl overflow-hidden shadow-2xl border border-gray-600 z-50"
                  : "w-full h-full"
          }
        `}>
                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName={roomName}
                    configOverwrite={{
                        startWithAudioMuted: true,
                        disableTileView: false,
                    }}
                    interfaceConfigOverwrite={{
                        VIDEO_LAYOUT_FIT: "nocrop",
                        TOOLBAR_BUTTONS: [
                            "microphone",
                            "camera",
                            "desktop", // 👈 SCREEN SHARE
                            "chat",
                            "hangup",
                            "tileview",
                        ],
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                    }}
                    getIFrameRef={(iframeRef) => {
                        iframeRef.style.width = "100%"
                        iframeRef.style.height = "100%"
                    }}
                />
            </div>
        </div>
    )
}

export default VideoCall
