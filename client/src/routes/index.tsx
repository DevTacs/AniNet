import {createFileRoute} from "@tanstack/react-router"
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

export const Route = createFileRoute("/")({
    component: RouteComponent,
})

function RouteComponent() {
    const handleGoogleLogin = () =>
        (window.location.href = "http://localhost:3000/auth/google")

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            {/* Optional background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(229,9,20,0.15),transparent_60%)]" />

            <Card className="relative w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl rounded-2xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-xl font-semibold">
                        Welcome back
                    </CardTitle>

                    <CardDescription className="text-foreground/60">
                        Login to continue watching your anime
                    </CardDescription>

                    <CardAction>
                        <Button
                            variant="link"
                            className="text-accent hover:text-accent/80">
                            Sign Up
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <form className="space-y-5">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-accent"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>

                            <Input
                                id="password"
                                type="password"
                                required
                                placeholder="Enter password"
                                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-accent"
                            />
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                    {/* Login */}
                    <Button className="w-full bg-accent hover:bg-accent/80 text-white">
                        Login
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center gap-2 w-full">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-xs text-foreground/50">OR</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Google */}
                    <Button
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
