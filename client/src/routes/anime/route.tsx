import DesktopLayout from "@/components/header/desktop-layout"
import MobileLayout from "@/components/header/mobile-layout"
import VideoCall from "@/components/watch-together/video-call"
import {api} from "@/configs/axios.config"
import {Outlet, createRootRoute, useNavigate} from "@tanstack/react-router"
import {Menu, X} from "lucide-react"
import {useState} from "react"

export const Route = createRootRoute({
    component: RootComponent,
    loader: async () => {
        const response = await api.get("/auth/authenticated")
        return response.data
    },
})

type AuthUser = {
    id: string
    username: string
    email: string
    avatar: string
}

function RootComponent() {
    const data: AuthUser = Route.useLoaderData()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [openCall, setOpenCall] = useState(false)

    const handleOnLoginClick = () => navigate({to: "/auth/login"})

    return (
        <>
            <header className="bg-background border-b border-white/10 backdrop-blur">
                <div className="flex items-center justify-between px-4 md:px-20 py-4">
                    <span className="text-2xl font-bold tracking-wide text-foreground">
                        Ani<span className="text-accent">Net</span>
                    </span>
                    <DesktopLayout
                        data={data}
                        handleOnLoginClick={handleOnLoginClick}
                        openCall={openCall}
                        setOpenCall={setOpenCall}
                    />

                    <button
                        className="md:hidden"
                        onClick={() => setOpen((prev: boolean) => !prev)}>
                        {open ? (
                            <X className="size-6 text-accent" />
                        ) : (
                            <Menu className="size-6 text-accent" />
                        )}
                    </button>
                </div>

                {open && (
                    <MobileLayout
                        data={data}
                        setOpen={setOpen}
                        handleOnLoginClick={handleOnLoginClick}
                        openCall={openCall}
                        setOpenCall={setOpenCall}
                    />
                )}
            </header>

            <main className="bg-background text-foreground min-h-screen relative">
                <Outlet />
                {openCall && (
                    <VideoCall username={data.username} email={data.email} />
                )}
            </main>
        </>
    )
}
