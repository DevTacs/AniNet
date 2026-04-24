import {Request, Response} from "express"

export const getMeAsync = async (req: Request, res: Response) => {
    console.log("asd")
    try {
        const user = req.user
        console.log(user)
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}
