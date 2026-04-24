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
            expiresIn: "7d",
        })

        res.redirect(`${process.env.CLIENT_URL}/login/success?token=${token}`)
    },
)

export default router
