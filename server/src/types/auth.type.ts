export type AuthUser = {
    id: string
    username: string
    password?: string
    email: string
    googleId?: string
    avatar?: string
}

export type GoogleUser = {
    googleId: string
    username: string
    email: string
    avatar: string
}
