import {Label} from "../ui/label"
import {Input} from "../ui/input"
import type {UseFormRegisterReturn, FieldError} from "react-hook-form"

type AuthForm = {
    username: string
    email: string
    password: string
}

type InputProps = {
    name: keyof AuthForm
    label: string
    type: string
    placeholder: string
    register: UseFormRegisterReturn
    error?: FieldError
}

export default function AuthInput({
    name,
    label,
    type,
    placeholder,
    register,
    error,
}: InputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-accent"
                {...register}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
        </div>
    )
}
