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
import {registerSchema, type RegisterSchemaInfer} from "@/schemas/auth.schema"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useMutation} from "@tanstack/react-query"
import {registerUserAsync} from "@/services/auth.service"

export const Route = createFileRoute("/auth/register")({
    component: RouteComponent,
})
function RouteComponent() {
    const navigate = useNavigate()
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
    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`
    }

    const handleRegister = async (data: RegisterSchemaInfer) => {
        try {
            await mutateAsync(data)
            navigate({to: "/anime/browse"})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative">
            {/* background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(229,9,20,0.15),transparent_60%)]" />

            <Card className="relative w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-xl font-semibold">
                        Create your account
                    </CardTitle>

                    <CardDescription className="text-foreground/60">
                        Join to start watching anime
                    </CardDescription>

                    <CardAction>
                        <Link
                            to="/auth/login"
                            className="text-accent hover:text-accent/80">
                            Login
                        </Link>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit(handleRegister)}
                        className="space-y-5">
                        {/* Username */}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-accent"
                                {...register("username")}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-accent"
                                {...register("email")}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create password"
                                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-accent"
                                {...register("password")}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/80 text-white">
                            Create
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                    {/* Divider */}
                    <div className="flex items-center gap-2 w-full">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-xs text-foreground/50">OR</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Google */}
                    <Button
                        type="button"
                        onClick={handleGoogleLogin}
                        variant="outline"
                        className="w-full border-white/10 bg-white/5 hover:bg-white/10">
                        <GoogleIcon />
                        Continue with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 48 48">
            <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.4 36 24 36
                c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1
                l5.7-5.7C33.5 6.1 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20
                20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-4z"
            />
            <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.5 16 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1
                l5.7-5.7C33.5 6.1 28.9 4 24 4 16.3 4 9.6 8.4 6.3 14.7z"
            />
            <path
                fill="#4CAF50"
                d="M24 44c5.3 0 10.1-2 13.7-5.3l-6.3-5.2C29.4 36 27 37 24 37
                c-5.4 0-9.9-3.3-11.7-8.1l-6.6 5.1C9 39.6 15.9 44 24 44z"
            />
            <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.5 5.4-6.6 6.8
                l6.3 5.2C38.6 37.6 44 31.6 44 24c0-1.3-.1-2.7-.4-4z"
            />
        </svg>
    )
}
