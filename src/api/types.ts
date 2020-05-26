export interface Movie {
    id: string;
    name: string;
    durationSeconds: number;
    releaseDate: string;
    actors: Actor[];
    averageRating: number;
    ratingCount: number;
}

export interface Actor {
    id: string;
    name: string;
}

export interface User {
    id: string;
    username: string;
}

export interface Rating {
    id: string;
    user: User;
    value: number;
    comment: string;
}

export interface GetMovies {
    movies: Movie[];
}

export interface GetMovieById {
    movie: Movie;
}

export interface GetRatings {
    ratingsForMovie: Rating[];
}

export interface GetCurrentUser {
    currentUser: User;
}

export interface GetAlreadyRated {
    alreadyRated: boolean;
}
