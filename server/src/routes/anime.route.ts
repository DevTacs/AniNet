import express from "express"
import {
    addAnimeBookmarkAsync,
    checkBookmark,
    getAnimeByCategory,
    getAnimeByIdAsync,
    getEpisodesByIdAsync,
    getTopRatedAnimeAsync,
} from "../controllers/anime.controller.js"
import {isAuthenticated} from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/featured", getTopRatedAnimeAsync)
router.get("/browse", getAnimeByCategory)
router.get("/bookmarked", isAuthenticated, checkBookmark)
router.get("/:id/episodes", getEpisodesByIdAsync)
router.get("/:id", getAnimeByIdAsync)

router.post("/bookmark", isAuthenticated, addAnimeBookmarkAsync)
export default router
