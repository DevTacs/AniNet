import express, {type Request, type Response} from "express"
import {
    getAnimeByIdAsync,
    getTopRatedAnimeAsync,
} from "../controllers/anime.controller.js"

const router = express.Router()

router.get("/featured", getTopRatedAnimeAsync)
router.get("/:id", getAnimeByIdAsync)
export default router
