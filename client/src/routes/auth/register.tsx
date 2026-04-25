import {createFileRoute, Link} from "@tanstack/react-router"
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

export const Route = createFileRoute("/auth/register")({
    component: RouteComponent,
})
function RouteComponent() {
    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("login submit")
        // TODO: email/password login API
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
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Username */}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-accent"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-accent"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create password"
                                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-accent"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-accent hover:bg-accent/80 text-white">
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
                        Continue with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
