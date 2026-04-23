import express, {type Request, type Response} from "express"
import {getTopRatedAnime} from "../controllers/anime.controller.js"

const router = express.Router()

router.get("/featured", getTopRatedAnime)

export default router
