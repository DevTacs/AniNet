import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {useNavigate} from "@tanstack/react-router"

export default function UserAvatarMenu() {
    const navigate = useNavigate()

    return (
        <DropdownMenu>
            {/* Avatar Trigger */}
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            {/* Dropdown Content */}
            <DropdownMenuContent
                align="end"
                className="w-56 rounded-xl p-2 shadow-lg bg-background border border-white/10 text-foreground">
                {/* User Info */}
                <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-400">john@email.com</p>
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-accent hover:bg-accent hover:text-foreground">
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
