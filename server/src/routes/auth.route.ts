import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"

const router = express.Router()

router.get(
    "/google",
    passport.authenticate("google", {scope: ["profile", "email"]}),
)

router.get(
    "/google/callback",
    passport.authenticate("google", {session: false}),
    (req, res) => {
        const user = req.user as any

        const token = jwt.sign(user, process.env.JWT_SECRET!, {
            expiresIn: "1d",
        })

        res.cookie("authToken", token, {
            httpOnly: true, // 👈 cannot be accessed by JS
            secure: process.env.ENVIRONMENT === "production", // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 3600000, // 1 hour
        })

        res.redirect(`${process.env.CLIENT_URL}/login/success?token=${token}`)
    },
)

export default router
