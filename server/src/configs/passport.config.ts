import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import {Strategy as LocalStrategy} from "passport-local"
import {AuthUser} from "../types/auth.type.js"
import bcrypt from "bcrypt"
import User from "../models/users.model.js"

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables")
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error(
        "GOOGLE_CLIENT_SECRET is not defined in environment variables",
    )
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
        },
        async (_, __, profile, done) => {
            const user: AuthUser = {
                id: profile.id,
                username: profile.displayName,
                email: profile.emails?.[0].value!,
                avatar: profile.photos?.[0].value,
            }

            return done(null, user)
        },
    ),
)

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = (await User.findOne({username})) || null

            if (!user) {
                return done(null, false, {message: "User not found"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return done(null, false, {message: "Invalid password"})
            }

            return done(null, user)
        } catch (err) {
            return done(err)
        }
    }),
)
export default passport
