import {NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken"
import {JwtPayload} from "../types/auth.type.js"

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies.authToken
    console.log(token)
    if (!token) {
        return res.status(401).json({data: null, message: "Not authenticated"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
        req.user = decoded
        next()
    } catch (err) {
        console.log(err)
        return res.status(401).json({message: "Invalid token"})
    }
}
