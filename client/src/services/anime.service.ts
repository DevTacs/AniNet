import {api} from "@/configs/axios.config"
import type {AnimeDetails, AnimeEpisode, AnimeInfo} from "@/types/anime.type"
import {animeResponseMap, animeResponsesMap} from "@/utils/response-map.util"

export const getFeaturedAnimeAsync = async (
    search: string,
    page: number,
): Promise<AnimeDetails[]> => {
    try {
        const {
            data: {AniData = []},
        } = await api.get(`/anime/featured?search=${search}&page=${page}`)

        return animeResponsesMap(AniData)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAnimeByIdAsync = async (id: number): Promise<AnimeInfo> => {
    try {
        const {data} = await api.get(`/anime/${id}`)
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
        } = await api.get(`/anime/${id}/episodes`)
        return episodes
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAnimeByCategory = async (
    genre: string,
    page: number,
): Promise<AnimeDetails[]> => {
    try {
        console.log(page)
        const {
            data: {wholePage},
        } = await api.get(`/anime/browse?genre=${genre}&page=${page}`)

        return animeResponsesMap(wholePage)
    } catch (error) {
        console.log(error)
        throw error
    }
}
