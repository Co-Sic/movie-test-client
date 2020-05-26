import gql from "graphql-tag";

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

export const ADD_RATING = gql`
    mutation addRating($movieId: String!, $value: Int!, $comment: String!) {
        addRating(movieId: $movieId, value: $value, comment: $comment){
            id, value, comment, user{username}
        }
    }
`;

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

export const GET_MOVIE_ALREADY_RATED = gql`
    query alreadyRated($movieId: String!) {
        alreadyRated(movieId: $movieId)
    }
`;

export const GET_ACTORS = gql`
    query actors {
        actors {
            id
            name
        }
    }
`;
