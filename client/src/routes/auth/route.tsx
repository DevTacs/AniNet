import {api} from "@/configs/axios.config"
import {createFileRoute, Outlet, redirect} from "@tanstack/react-router"

export const Route = createFileRoute("/auth")({
    component: RouteComponent,
    loader: async () => {
        const response = await api.get("/auth/authenticated")
        console.log(response.data)
        if (response.data) {
            throw redirect({
                to: "/anime",
            })
        }
    },
})

function RouteComponent() {
    return <Outlet />
}
