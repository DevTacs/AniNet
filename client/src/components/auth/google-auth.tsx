import {Button} from "../ui/button"
import GoogleIcon from "./google-icon"

export default function GoogleAuth() {
    return (
        <Button
            type="button"
            onClick={() =>
                (window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`)
            }
            variant="outline"
            className="w-full border-white/10 bg-white/5 hover:bg-white/10">
            <GoogleIcon />
            Continue with Google
        </Button>
    )
}
