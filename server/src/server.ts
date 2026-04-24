import express from "express"
import cors from "cors"
const app = express()

const port = process.env.PORT

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }),
)
app.use(express.json())

import "./configs/passport.config.js"
import authRoutes from "./routes/auth.route.js"
import animeRoutes from "./routes/anime.route.js"

app.use("/auth", authRoutes)
app.use("/api/anime", animeRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
