import {api} from "@/configs/axios.config"
import type {AnimeDetails, AnimeEpisode, AnimeInfo} from "@/types/anime.type"
import {animeResponseMap, animeResponsesMap} from "@/utils/response-map.util"

export const getFeaturedAnimeAsync = async (): Promise<AnimeDetails[]> => {
    try {
        const {
            data: {AniData},
        } = await api.get("/featured")

        return animeResponsesMap(AniData)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAnimeByIdAsync = async (id: number): Promise<AnimeInfo> => {
    try {
        const {data} = await api.get(`/${id}`)
        return animeResponseMap(data)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getEpisodesByIdAsync = async (
    id: number,
): Promise<AnimeEpisode[]> => {
    try {
        const {
            data: {episodes},
        } = await api.get(`/${id}/episodes`)
        return episodes
    } catch (error) {
        console.log(error)
        throw error
    }
}
