import {type Request, type Response} from "express"
import {
    findByGenre,
    getInfo,
    getStreamingLinks,
    getTopRated,
    searchAll,
} from "anipub"
import Bookmark from "../models/bookmarks.model.js"
import mongoose from "mongoose"
import {JwtPayload} from "../types/auth.type.js"

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

export const getAnimeByCategoryAsync = async (req: Request, res: Response) => {
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

export const checkBookmarkAsync = async (req: Request, res: Response) => {
    try {
        const user = req.user as JwtPayload
        const objectId = new mongoose.Types.ObjectId(user.id)
        const animeId = Number(req.query.animeId)

        const exists = await Bookmark.exists({user: objectId, animeId})
        if (!exists) return res.json({exists: false})

        res.json({exists})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const toggleAnimeBookmarkAsync = async (req: Request, res: Response) => {
    try {
        const user = req.user as JwtPayload
        const {animeId} = req.body

        const exist = await Bookmark.where("animeId", animeId)
        if (exist.length == 0) {
            const anime = await getInfo(animeId)

            if (!anime)
                return res.status(404).json({message: "Anime not found"})

            await Bookmark.create({
                user: user.id,
                animeId,
                Name: anime.Name,
                ImagePath: anime.ImagePath,
            })

            return res.json({message: "Bookmark added successfully"})
        }

        const objectId = new mongoose.Types.ObjectId(user.id)
        await Bookmark.deleteOne({user: objectId, animeId})

        res.json({message: "Bookmark removed successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}
