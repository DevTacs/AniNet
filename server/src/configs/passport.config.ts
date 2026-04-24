import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"

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
            callbackURL: `${process.env.API_URL}/auth/google/callback`,
        },
        async (_, __, profile, done) => {
            const user = {
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails?.[0].value,
                avatar: profile.photos?.[0].value,
            }

            return done(null, user)
        },
    ),
)

export default passport
