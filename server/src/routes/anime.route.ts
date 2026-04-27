import express from "express"
import {
    checkBookmarkAsync,
    getAnimeByCategoryAsync,
    getAnimeByIdAsync,
    getEpisodesByIdAsync,
    getTopRatedAnimeAsync,
    toggleAnimeBookmarkAsync,
} from "../controllers/anime.controller.js"
import {isAuthenticated} from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/featured", getTopRatedAnimeAsync)
router.get("/browse", getAnimeByCategoryAsync)
router
    .route("/bookmark")
    .get(isAuthenticated, checkBookmarkAsync)
    .put(isAuthenticated, toggleAnimeBookmarkAsync)

router.get("/:id/episodes", getEpisodesByIdAsync)
router.get("/:id", getAnimeByIdAsync)

export default router
