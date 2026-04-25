import {api} from "@/configs/axios.config"
import type {LoginSchemaInfer, RegisterSchemaInfer} from "@/schemas/auth.schema"

export const loginUserAsync = async (user: LoginSchemaInfer) => {
    try {
        await api.post("/auth/login", user)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const registerUserAsync = async (user: RegisterSchemaInfer) => {
    try {
        await api.post("/auth/register", user)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const logoutUserAsync = async () => {
    try {
        await api.delete("/auth/logout")
    } catch (error) {
        console.log(error)
        throw error
    }
}
