import {createFileRoute, Link, useNavigate} from "@tanstack/react-router"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {loginSchema, type LoginSchemaInfer} from "@/schemas/auth.schema"
import {useMutation} from "@tanstack/react-query"
import {loginUserAsync} from "@/services/auth.service"
import GoogleAuth from "@/components/auth/google-auth"
import AuthInput from "@/components/auth/auth-input"
import Divider from "@/components/auth/dividers"
import Header from "@/components/auth/header"

export const Route = createFileRoute("/auth/login")({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
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

    const handleOnSubmit = async (data: LoginSchemaInfer) => {
        try {
            await mutateAsync(data)
            navigate({to: "/anime/browse"})
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(229,9,20,0.15),transparent_60%)]" />
            <Card className="relative w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl rounded-2xl">
                <Header
                    title="Welcome back"
                    description="Join to start watching anime"
                    label="Register"
                    path="/auth/register"
                />
                <CardContent>
                    <form
                        className="space-y-5"
                        onSubmit={handleSubmit(handleOnSubmit)}>
                        <AuthInput
                            name="username"
                            label="Username"
                            type="text"
                            placeholder="Enter username"
                            register={register("username")}
                            error={errors.username}
                        />
                        <AuthInput
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            register={register("password")}
                            error={errors.password}
                        />
                        <Button className="w-full bg-accent hover:bg-accent/80 text-white">
                            Login
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button
                        onClick={() => navigate({to: "/anime/browse"})}
                        variant="outline"
                        className="w-full">
                        Login as Guest
                    </Button>
                    <Divider />
                    <GoogleAuth />
                </CardFooter>
            </Card>
        </div>
    )
}
