import gql from "graphql-tag";

export const GET_MOVIES = gql`
    query movies {
        movies {
            id
            name
            durationSeconds
            releaseDate
            actors {
                id
                name
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
