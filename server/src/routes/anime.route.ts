import express from "express"
import {
    getAnimeByIdAsync,
    getEpisodesByIdAsync,
    getTopRatedAnimeAsync,
} from "../controllers/anime.controller.js"

const router = express.Router()

router.get("/featured", getTopRatedAnimeAsync)
router.get("/:id", getAnimeByIdAsync)
router.get("/:id/episodes", getEpisodesByIdAsync)
export default router
