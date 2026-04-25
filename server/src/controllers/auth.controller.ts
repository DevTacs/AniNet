import {Request, Response} from "express"
import {AuthUser, GoogleUser} from "../types/auth.type.js"
import jwt from "jsonwebtoken"
import User from "../models/users.model.js"
import bcrypt from "bcrypt"

export const googleCallbackAsync = async (req: Request, res: Response) => {
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

    await User.create({
        googleId: user.googleId,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
    })
    res.redirect(`${process.env.CLIENT_URL}/anime/browse`)
}

export const getUserFromCookieAsync = async (req: Request, res: Response) => {
    const token = req.cookies.authToken
    if (!token) {
        return res.json(null)
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    res.json(decoded)
}

export const getMeAsync = async (req: Request, res: Response) => {
    try {
        const user = req.user as AuthUser

        res.json(user)
    } catch (error) {
        console.log(error)
    }
}
export const loginUserAsync = async (req: Request, res: Response) => {
    try {
        const user = req.user as AuthUser
        console.log(user)
        if (!user) return res.status(401).json({message: "User not found"})

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            },
            process.env.JWT_SECRET!,
        )

        res.cookie("authToken", token, {
            httpOnly: true, // 👈 cannot be accessed by JS
            secure: process.env.ENVIRONMENT === "production", // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 3600000, // 1 hour
        })

        res.json({message: "Login successful"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const registerUserAsync = async (req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body

        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        const findUser = await User.findOne(
            {email},
            {
                id: true,
                username: true,
                email: true,
                avatar: true,
            },
        )
        const payload = {
            id: findUser?.id.toString(),
            username: findUser?.username,
            email: findUser?.email,
            avatar: findUser?.avatar,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "1d",
        })

        res.cookie("authToken", token, {
            httpOnly: true, // 👈 cannot be accessed by JS
            secure: process.env.ENVIRONMENT === "production", // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 3600000, // 1 hour
        })

        res.json({user, message: "User created successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const logoutUserAsync = async (req: Request, res: Response) => {
    try {
        res.clearCookie("authToken", {
            httpOnly: true, // 👈 cannot be accessed by JS
            secure: process.env.ENVIRONMENT === "production", // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 3600000, // 1 hour
        })

        res.json({message: "Logged out"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}
