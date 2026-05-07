import {getEpisodesByIdAsync} from "@/services/anime.service"
import type {AnimeEpisode} from "@/types/anime.type"
import {useQuery} from "@tanstack/react-query"
import {useEffect, useState} from "react"

export function useAnimeEpisodes({id}: {id: string}) {
    const storageKey = `anime-${id}-episode`

    const [selectedEpisode, setSelectedEpisode] = useState<string>("")

    const {data: episodes} = useQuery<AnimeEpisode[]>({
        queryKey: ["anime", id, "episodes"],
        queryFn: () => getEpisodesByIdAsync(Number(id)),
    })

    // hydrate from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(storageKey)
        if (saved) setSelectedEpisode(saved)
    }, [storageKey])

    // fallback to first episode
    useEffect(() => {
        const first = episodes?.[0]?.src

        if (!selectedEpisode && first) {
            setSelectedEpisode(first)
        }
    }, [episodes, selectedEpisode])

    // persist
    useEffect(() => {
        if (selectedEpisode) {
            localStorage.setItem(storageKey, selectedEpisode)
        }
    }, [selectedEpisode, storageKey])

    return {
        episodes,
        selectedEpisode,
        setSelectedEpisode,
    }
}
