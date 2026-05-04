import {useEffect, useState} from "react"
import {JitsiMeeting} from "@jitsi/react-sdk"

const VideoCall = () => {
    const roomName = "my-room-123"
    const [minimized, setMinimized] = useState(false)

    useEffect(() => {
        // save room so we can recover after refresh
        localStorage.setItem("activeRoom", roomName)
    }, [])

    return (
        <div className="w-full h-full bg-transparent pointer-events-none absolute top-0 left-0">
            <div className="fixed top-3 right-3 z-50">
                <button
                    onClick={() => setMinimized(!minimized)}
                    className="bg-white text-black px-3 py-1 rounded shadow cursor-pointer pointer-events-auto">
                    {minimized ? "Restore" : "Minimize"}
                </button>
            </div>

            <div
                className={`
          transition-all duration-300 ease-in-out pointer-events-auto
          ${
              minimized
                  ? "fixed bottom-4 right-4 w-90 h-55 rounded-xl overflow-hidden shadow-2xl border border-gray-600 z-50"
                  : "w-full h-full"
          }
        `}>
                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName={roomName}
                    configOverwrite={{
                        startWithAudioMuted: true,
                        disableTileView: false,
                    }}
                    interfaceConfigOverwrite={{
                        VIDEO_LAYOUT_FIT: "nocrop",
                        TOOLBAR_BUTTONS: [
                            "microphone",
                            "camera",
                            "desktop", // 👈 SCREEN SHARE
                            "chat",
                            "hangup",
                            "tileview",
                        ],
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                    }}
                    getIFrameRef={(iframeRef) => {
                        iframeRef.style.width = "100%"
                        iframeRef.style.height = "100%"
                    }}
                />
            </div>
        </div>
    )
}

export default VideoCall
