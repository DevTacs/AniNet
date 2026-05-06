import {Link} from "@tanstack/react-router"

export default function Navigation({
    label,
    path,
}: {
    label: string
    path: string
}) {
    return (
        <Link
            to={path}
            className="text-sm text-foreground/70 hover:text-foreground transition"
            activeProps={{
                className:
                    "text-foreground font-semibold border-b-2 border-accent pb-1",
            }}>
            {label}
        </Link>
    )
}
