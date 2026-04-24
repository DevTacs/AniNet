import {createFileRoute} from "@tanstack/react-router"

export const Route = createFileRoute("/test/")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <button
            onClick={() => {
                window.location.href = "http://localhost:3000/auth/google"
            }}>
            Click
        </button>
    )
}
