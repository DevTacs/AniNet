import zod from "zod"

export const loginSchema = zod.object({
    username: zod.string().trim().min(1, "Username is required"),
    password: zod.string().trim().min(1, "Password is required"),
})

export const registerSchema = zod.object({
    username: zod
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters"),
    email: zod.string().trim().min(3, "Email must be at least 3 characters"),
    password: zod
        .string()
        .trim()
        .min(3, "Password must be at least 3 characters"),
})

export type LoginSchemaInfer = zod.infer<typeof loginSchema>
export type RegisterSchemaInfer = zod.infer<typeof registerSchema>
