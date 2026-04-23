import express from "express"
import cors from "cors"
import animeRoutes from "./routes/anime.route.js"
import dotenv from "dotenv"

const app = express()
dotenv.config()

const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use("/api/anime", animeRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
