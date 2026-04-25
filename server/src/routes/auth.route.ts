import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import {getMeAsync} from "../controllers/auth.controller.js"
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
    (req, res) => {
        const user = req.user as AuthUser
        const token = jwt.sign(user, process.env.JWT_SECRET!, {
            expiresIn: "1d",
        })

        res.cookie("authToken", token, {
            httpOnly: true, // 👈 cannot be accessed by JS
            secure: process.env.ENVIRONMENT === "production", // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 3600000, // 1 hour
        })
        res.redirect(`${process.env.CLIENT_URL}/anime`)
    },
)
router.get("/authenticated", (req, res) => {
    const token = req.cookies.authToken
    console.log(req.cookies)
    if (!token) {
        return res.json(null)
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    console.log(decoded)
    res.json(decoded)
})
router.get("/me", isAuthenticated, getMeAsync)

export default router
