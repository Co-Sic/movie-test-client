export interface Movie {
    id: string;
    name: string;
    durationSeconds: number;
    releaseDate: string;
    actors: Actor[];
}

export interface Actor {
    id: string;
    name: string;
}

export interface GetMovie {
    movies: Movie[]
}
