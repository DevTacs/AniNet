import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import {
    getMeAsync,
    getUserFromCookieAsync,
    googleCallbackAsync,
    loginUserAsync,
    registerUserAsync,
} from "../controllers/auth.controller.js"
import {AuthUser} from "../types/auth.type.js"
import {isAuthenticated} from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get(
    "/google",
    passport.authenticate("google", {scope: ["profile", "email"]}),
)
router.get(
    "/google/callback",
    passport.authenticate("google", {session: false}),
    googleCallbackAsync,
)
router.get("/authenticated", getUserFromCookieAsync)
router.get("/me", isAuthenticated, getMeAsync)
router.post("/login", loginUserAsync)
router.post("/register", registerUserAsync)

export default router
