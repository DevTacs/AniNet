import {Request, Response} from "express"
import {AuthUser} from "../types/auth.type.js"

export const getMeAsync = async (req: Request, res: Response) => {
    try {
        const user = req.user as AuthUser

        res.json(user)
    } catch (error) {
        console.log(error)
    }
}
