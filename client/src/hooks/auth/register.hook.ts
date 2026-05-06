import {registerSchema, type RegisterSchemaInfer} from "@/schemas/auth.schema"
import {registerUserAsync} from "@/services/auth.service"
import {zodResolver} from "@hookform/resolvers/zod"
import {useMutation} from "@tanstack/react-query"
import {useForm} from "react-hook-form"

export function useRegister() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterSchemaInfer>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })

    const {mutateAsync} = useMutation({
        mutationKey: ["register"],
        mutationFn: async (data: RegisterSchemaInfer) =>
            registerUserAsync(data),
    })

    return {
        register,
        handleSubmit,
        errors,
        mutateAsync,
    }
}
