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
import AuthInput from "@/components/auth/auth-input"
import GoogleAuth from "@/components/auth/google-auth"

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
                        <AuthInput
                            name="username"
                            label="Username"
                            type="string"
                            placeholder="Enter your username"
                            register={register("username")}
                            error={errors.username}
                        />
                        <AuthInput
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            register={register("email")}
                            error={errors.email}
                        />
                        <AuthInput
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            register={register("password")}
                            error={errors.password}
                        />

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

                    <GoogleAuth />
                </CardFooter>
            </Card>
        </div>
    )
}
