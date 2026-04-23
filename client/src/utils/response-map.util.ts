import type {
    AnimeDetails,
    AnimeDetailsApi,
    AnimeInfo,
    AnimeInfoApi,
} from "@/types/anime.type"

export const animeResponsesMap = (
    AniData: AnimeDetailsApi[],
): AnimeDetails[] => {
    return AniData.map((anime: AnimeDetailsApi) => ({
        _id: anime._id,
        name: anime.Name,
        imagePath: anime.ImagePath,
        malScore: Number(anime.MALScore),
        ratingNumber: anime.RatingNumber,
        description: anime.DescripTion,
    }))
}

export const animeResponseMap = (data: AnimeInfoApi): AnimeInfo => {
    return {
        _id: data._id,
        name: data.Name,
        imagePath: data.ImagePath,
        cover: data.Cover,
        synonyms: data.Synonyms,
        aired: data.Aired,
        premiered: data.Premiered,
        genres: data.Genres,
        studios: data.Studios,
        duration: data.Duration,
        malScore: data.MALScore,
        ratingsNum: Number(data.RatingsNum),
        description: data.DescripTion,
        status: data.Status,
        epCount: data.epCount,
        finder: data.finder,
    }
}
