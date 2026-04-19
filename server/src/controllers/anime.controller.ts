import {type Request, type Response} from "express"
import {getTopRated} from "anipub"

export const getTopRatedAnime = async (req: Request, res: Response) => {
    try {
        const {page} = req.query as {page?: number}

        const result = await getTopRated(page)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "An error occurred while fetching top-rated anime.",
        })
    }
}
