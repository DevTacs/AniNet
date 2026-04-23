import express from "express"
import cors from "cors"
import animeRoutes from "./routes/anime.route.js"
import {findByGenre, getStreamingLinks, getTopRated, searchAll} from "anipub"

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/api/anime", animeRoutes)
app.get("/episodes", async (req: express.Request, res: express.Response) => {
    const {AniData: data} = await getTopRated()
    const {episodes} = await getStreamingLinks(2454)
    const animes = data.map(({_id, Name}) => ({_id, Name}))

    const test = await findByGenre("action")
    res.json(episodes)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
