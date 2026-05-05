import {Label} from "../ui/label"
import {Input} from "../ui/input"
import type {UseFormRegister, FieldErrors} from "react-hook-form"

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
    register: UseFormRegister<AuthForm>
    errors: FieldErrors<AuthForm>
}

export default function AuthInput({
    name,
    label,
    type,
    placeholder,
    register,
    errors,
}: InputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-accent"
                {...register(name)}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                    {errors[name].message}
                </p>
            )}
        </div>
    )
}
