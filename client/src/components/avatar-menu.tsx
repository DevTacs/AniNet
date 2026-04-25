import {Avatar, AvatarImage} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {logoutUserAsync} from "@/services/auth.service"
import {useMutation} from "@tanstack/react-query"
import {useNavigate} from "@tanstack/react-router"

type AuthUser = {
    username: string
    email: string
    avatar: string
}

export default function UserAvatarMenu({data}: {data: AuthUser}) {
    const navigate = useNavigate()
    const {mutateAsync} = useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => logoutUserAsync(),
    })
    const handleLogout = async () => {
        try {
            await mutateAsync()
            navigate({to: "/auth/login"})
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    return (
        <DropdownMenu>
            {/* Avatar Trigger */}
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage
                        src={data.avatar}
                        referrerPolicy="no-referrer"
                    />
                </Avatar>
            </DropdownMenuTrigger>

            {/* Dropdown Content */}
            <DropdownMenuContent
                align="end"
                className="w-56 rounded-xl p-2 shadow-lg bg-background border border-white/10 text-foreground">
                {/* User Info */}
                <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{data.username}</p>
                    <p className="text-xs text-gray-400">{data.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                    className="text-accent hover:bg-accent hover:text-foreground"
                    onClick={() => handleLogout()}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
