import {api} from "@/configs/axios.config"
import type {LoginSchemaInfer, RegisterSchemaInfer} from "@/schemas/auth.schema"

export const loginUser = async (user: LoginSchemaInfer) => {
    try {
    } catch (error) {}
}

export const registerUserAsync = async (user: RegisterSchemaInfer) => {
    try {
        await api.post("/auth/register", user)
    } catch (error) {
        console.log(error)
        throw error
    }
}
