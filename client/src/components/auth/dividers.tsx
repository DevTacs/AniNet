export default function Divider() {
    return (
        <div className="flex items-center gap-2 w-full">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-foreground/50">OR</span>
            <div className="flex-1 h-px bg-white/10" />
        </div>
    )
}
