import {loginSchema, type LoginSchemaInfer} from "@/schemas/auth.schema"
import {loginUserAsync} from "@/services/auth.service"
import {zodResolver} from "@hookform/resolvers/zod"
import {useMutation} from "@tanstack/react-query"
import {useForm} from "react-hook-form"

export function useLogin() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginSchemaInfer>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const {mutateAsync} = useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: LoginSchemaInfer) => loginUserAsync(data),
    })

    return {
        register,
        handleSubmit,
        errors,
        mutateAsync,
    }
}
