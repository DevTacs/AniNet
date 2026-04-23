export type AnimeDetailsApi = {
    _id: number
    Name: string
    ImagePath: string
    MALScore: string
    RatingNumber: number
    DescripTion: string
}

export type AnimeDetails = {
    _id: number
    name: string
    imagePath: string
    malScore: number
    ratingNumber: number
    description: string
}

export type AnimeInfoApi = {
    _id: number
    Name: string
    ImagePath: string
    Cover: string
    Synonyms: string
    Aired: string
    Premiered: string
    RatingsNum: number
    Genres: string[]
    Studios: string
    DescripTion: string
    Duration: string
    MALScore: string
    Status: string
    epCount: number
    finder?: string
}

export type AnimeInfo = {
    _id: number
    name: string
    imagePath: string
    cover: string
    synonyms: string
    aired: string
    premiered: string
    ratingsNum: number
    genres: string[]
    studios: string
    description: string
    duration: string
    malScore: string
    status: string
    epCount: number
    finder?: string
}

export type AnimeEpisode = {
    ep: number
    src: string
}
