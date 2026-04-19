import express from "express"
import cors from "cors"
import animeRoutes from "./routes/anime.route.js"

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/api/anime", animeRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
