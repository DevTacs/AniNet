import express from "express"
import cors from "cors"
import {connectDB} from "./configs/db.config.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }),
)
app.use(express.json())
app.use(cookieParser())
connectDB()

import "./configs/passport.config.js"
import authRoutes from "./routes/auth.route.js"
import animeRoutes from "./routes/anime.route.js"

app.use("/auth", authRoutes)
app.use("/api/anime", animeRoutes)

const port = process.env.PORT
app.listen(port)
