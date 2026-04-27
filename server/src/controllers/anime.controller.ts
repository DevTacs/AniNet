import {type Request, type Response} from "express"
import {
    findByGenre,
    getInfo,
    getStreamingLinks,
    getTopRated,
    searchAll,
} from "anipub"
import Bookmark from "../models/bookmarks.model.js"

export const getTopRatedAnimeAsync = async (req: Request, res: Response) => {
    try {
        const {search} = req.query as {search?: string}
        const {page} = req.query as {page?: number}

        if (search && page) {
            const result = await searchAll(search, page)
            return res.json(result)
        }
        const result = await getTopRated(page)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
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
        res.status(500).json({message: "Internal server error"})
    }
}

export const getEpisodesByIdAsync = async (
    req: Request<{id: number}>,
    res: Response,
) => {
    try {
        const id = Number(req.params.id)
        const episodes = await getStreamingLinks(id)
        res.json(episodes)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const getAnimeByCategory = async (req: Request, res: Response) => {
    try {
        const genre = req.query.genre as string
        const page = Number(req.query.page)

        const anime = await findByGenre(genre)
        res.json(anime)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const checkBookmark = async (req: Request, res: Response) => {
    try {
        const {userId, animeId} = req.body

        const exists = await Bookmark.exists({user: userId, animeId})

        res.json({exists})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const addAnimeBookmarkAsync = async (req: Request, res: Response) => {
    try {
        const {userId, animeId} = req.body

        const anime = await getInfo(animeId)

        await Bookmark.create({
            user: userId,
            animeId,
            Name: anime.Name,
            ImagePath: anime.ImagePath,
        })

        res.json({message: "Bookmark added successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}
