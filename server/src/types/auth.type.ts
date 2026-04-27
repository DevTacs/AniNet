export type AuthUser = {
    id: string
    username: string
    email: string
    avatar?: string
}

export type JwtPayload = {
    id: string
    username: string
    email: string
    avatar: string
}
