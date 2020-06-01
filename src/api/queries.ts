import gql from "graphql-tag";

/**
 * Movies
 */
export const GET_MOVIES = gql`
    query movies {
        movies {
            id
            name
            durationSeconds
            releaseDate
            actors{
                id
                name
            }
            averageRating
            ratingCount
        }
    }
`;

export const GET_MOVIE_BY_ID = gql`
    query movie($id: String!) {
        movie(id: $id) {
            id
            name
            durationSeconds
            releaseDate
            actors{
                id
                name
            }
            averageRating
            ratingCount
        }
    }
`;

export const GET_RATINGS_FOR_MOVIE = gql`
    query ratingsForMovie($movieId: String!) {
        ratingsForMovie(movieId: $movieId){
            id
            value
            comment
            dateCreated
            user {
                id
                username
            }
        }
    }
`;

export const DELETE_MOVIE = gql`
    mutation deleteMovie($id: String!) {
        deleteMovie(id: $id)
    }
`;

export const ADD_MOVIE = gql`
    mutation addMovie($name: String!, $releaseDate: String!, $durationSeconds: Int!, $actors: [String!]!) {
        addMovie(name: $name, releaseDate: $releaseDate, durationSeconds: $durationSeconds, actors: $actors){
            id, name, releaseDate, durationSeconds, actors{id, name}
        }
    }
`;

export const EDIT_MOVIE = gql`
    mutation editMovie($id:ID!, $name: String!, $releaseDate: String!, $durationSeconds: Int!, $actors: [String!]!) {
        editMovie(id: $id, name: $name, releaseDate: $releaseDate, durationSeconds: $durationSeconds, actors: $actors){
            id, name, releaseDate, durationSeconds, actors{id, name}
        }
    }
`;

/**
 * Ratings
 */
export const ADD_RATING = gql`
    mutation addRating($movieId: String!, $value: Int!, $comment: String!) {
        addRating(movieId: $movieId, value: $value, comment: $comment){
            id, value, comment, user{id, username}
        }
    }
`;

export const GET_MOVIE_ALREADY_RATED = gql`
    query alreadyRated($movieId: String!) {
        alreadyRated(movieId: $movieId)
    }
`;

/**
 * User
 */
export const LOGIN_USER = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password){token}
    }
`;

export const REGISTER_USER = gql`
    mutation Register($username: String!, $password: String!) {
        register(username: $username, password: $password){id}
    }
`;

export const GET_CURRENT_USER = gql`
    query currentUser {
        currentUser {
            id
            username
        }
    }
`;

/**
 * Subscriptions
 */
export const SUB_MOVIE_ACTION = gql`
    subscription movieAction {
        movieAction {
            movie {
                id
                name
            }
            user {
                id
                username
            }
            type
        }
    }
`;


export const SUB_RATING_ADDED = gql`
    subscription ratingAdded {
        ratingAdded {
            id
            value
            comment
            dateCreated
            user {
                id
                username
            }
            movie {
                id
                name
            }
        }
    }
`;
