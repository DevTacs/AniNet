import express from "express"
import {
    getAnimeByCategory,
    getAnimeByIdAsync,
    getEpisodesByIdAsync,
    getTopRatedAnimeAsync,
} from "../controllers/anime.controller.js"

const router = express.Router()

router.get("/featured", getTopRatedAnimeAsync)
router.get("/browse", getAnimeByCategory)
router.get("/:id/episodes", getEpisodesByIdAsync)
router.get("/:id", getAnimeByIdAsync)
export default router
