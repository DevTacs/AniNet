import {Request, Response} from "express"
import {AuthUser} from "../types/auth.type.js"
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

    res.redirect(`${process.env.CLIENT_URL}/anime`)
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
export const loginUserAsync = async (req: Request, res: Response) => {}

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

        res.json({user, message: "User created successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}
