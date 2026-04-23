import type {AnimeDetails} from "@/types/anime.type"
import {api} from "../utils/axios.config"

export const getFeaturedAnime = async (): Promise<AnimeDetails[]> => {
    try {
        const {
            data: {AniData},
        } = await api.get("/featured")

        return AniData.map((anime: any) => ({
            _id: anime._id,
            name: anime.Name,
            imagePath: anime.ImagePath,
            malScore: Number(anime.MALScore),
            ratingNumber: anime.RatingsNum,
            description: anime.DescripTion,
        }))
    } catch (error) {
        console.log(error)
        throw error
    }
}
