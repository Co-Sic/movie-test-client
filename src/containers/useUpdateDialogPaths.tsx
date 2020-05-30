import {useEffect, useState} from "react";
import {routingPaths} from "../__constants__";
import {Movie} from "../api/types";
import {DialogMode, emptyMovie} from "../pages/MoviePage";
import * as H from "history"


function useUpdateDialogPaths(movies: Movie[], history: H.History<H.LocationState>) {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [dialogMode, setDialogMode] = useState<DialogMode>(DialogMode.DETAIL);
    
    useEffect(() => {
        return history.listen((location) => {
            const getMovieFromPath = (basePath: string): (Movie | undefined) => {
                let movieId = location.pathname.replace(basePath + "/", "");
                return movies.find(m => m.id === movieId);
            };
            console.log(location.pathname);
            if (location.pathname === routingPaths.movies) {
                if (selectedMovie !== null) {
                    setSelectedMovie(null);
                }
            } else if (location.pathname === routingPaths.moviesAdd) {
                if (dialogMode !== DialogMode.CREATE) {
                    setDialogMode(DialogMode.CREATE);
                }
                if (selectedMovie === null) {
                    setSelectedMovie(emptyMovie);
                }
            } else if (location.pathname.includes(routingPaths.moviesDetail)) {
                let pathMovie = getMovieFromPath(routingPaths.moviesDetail);
                if (!pathMovie) {
                    history.push(routingPaths.movies);
                } else {
                    if (dialogMode !== DialogMode.DETAIL) {
                        setDialogMode(DialogMode.DETAIL);
                    }
                    if (selectedMovie === null || selectedMovie.id !== pathMovie.id) {
                        setSelectedMovie(pathMovie);
                    }
                }

            } else if (location.pathname.includes(routingPaths.moviesEdit)) {
                let pathMovie = getMovieFromPath(routingPaths.moviesEdit);
                if (!pathMovie) {
                    history.push(routingPaths.movies);
                } else {
                    if (dialogMode !== DialogMode.EDIT) {
                        setDialogMode(DialogMode.EDIT);
                    }
                    if (selectedMovie === null || selectedMovie.id !== pathMovie.id) {
                        setSelectedMovie(pathMovie);
                    }
                }
            } else if (location.pathname.includes(routingPaths.moviesRate)) {
                let pathMovie = getMovieFromPath(routingPaths.moviesRate);
                if (!pathMovie) {
                    history.push(routingPaths.movies);
                } else {
                    if (dialogMode !== DialogMode.RATING) {
                        setDialogMode(DialogMode.RATING);
                    }
                    if (selectedMovie === null || selectedMovie.id !== pathMovie.id) {
                        setSelectedMovie(pathMovie);
                    }
                }
            }
        })
    },[history, selectedMovie, dialogMode, movies]);

    return {
        selectedMovie,
        setSelectedMovie,
        dialogMode
    }
}

export default useUpdateDialogPaths;
