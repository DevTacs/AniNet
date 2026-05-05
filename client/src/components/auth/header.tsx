import {Link} from "@tanstack/react-router"
import {CardAction, CardDescription, CardHeader, CardTitle} from "../ui/card"

type HeaderProps = {
    title: string
    description: string
    label: string
    path: string
}

export default function Header({title, description, label, path}: HeaderProps) {
    return (
        <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <CardDescription className="text-foreground/60">
                {description}
            </CardDescription>
            <CardAction>
                <Link to={path} className="text-accent hover:text-accent/80">
                    {label}
                </Link>
            </CardAction>
        </CardHeader>
    )
}
