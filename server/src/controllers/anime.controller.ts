import {type Request, type Response} from "express"
import {getInfo, getTopRated} from "anipub"

export const getTopRatedAnimeAsync = async (req: Request, res: Response) => {
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

export const getAnimeByIdAsync = async (
    req: Request<{id: number}>,
    res: Response,
) => {
    try {
        const id = Number(req.params.id)
        const data = await getInfo(id)
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "An error occurred while fetching anime details.",
        })
    }
}
