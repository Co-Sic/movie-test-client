import React, {useState} from "react";
import MovieTable from "../containers/MovieTable";
import styled from "styled-components";
import {Typography, Button, Dialog, useTheme, useMediaQuery, Slide} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {Movie} from "../api/types";
import {TransitionProps} from "@material-ui/core/transitions";
import CreateEditMovieDialog from "../containers/CreateEditMovieDialog";
import {useMutation} from "@apollo/react-hooks";
import {ADD_MOVIE, DELETE_MOVIE, EDIT_MOVIE, GET_MOVIES} from "../api/queries";
import MovieDetailView from "../containers/MovieDetailView";
import CreateRatingDialog from "../containers/CreateRatingDialog";
import Notifications from "../containers/Notifications";
import SearchInput from "../components/SearchInput";
import {Route, useHistory} from "react-router-dom";
import {routingPaths} from "../__constants__";
import useUpdateDialogPaths from "../containers/useUpdateDialogPaths";
import useFetchMovies from "../containers/useFetchMovies";

export enum DialogMode {
    DETAIL,
    EDIT,
    CREATE,
    RATING
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const emptyMovie: Movie = {
    id: "",
    name: "",
    durationSeconds: 0,
    releaseDate: "2020-01-01",
    actors: [],
    averageRating: 0,
    ratingCount: 0,
};


function MoviePage() {

    const [addMovie] = useMutation(ADD_MOVIE, {
        refetchQueries: [{query: GET_MOVIES}]
    });

    const [deleteMovie] = useMutation(DELETE_MOVIE, {
        refetchQueries: [{query: GET_MOVIES}]
    });

    const [editMovie] = useMutation(EDIT_MOVIE);

    const theme = useTheme();
    const history = useHistory();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [searchText, setSearchText] = useState<string>("");
    
    const {
        data,
        error,
        loading
    } = useFetchMovies();
    let movies: Movie[] = [];
    if (data) {
        movies = data.movies;
    }
    const {selectedMovie, setSelectedMovie, dialogMode} = useUpdateDialogPaths(movies, history);

    const startCreate = () => {
        history.push(routingPaths.moviesAdd);
    };

    const handleCreateSubmit = (movie: Movie) => {
        const {id, actors, ...rest} = movie;
        addMovie({variables: {...rest, actors: actors.map(a => a.name)}}).catch(err => console.log(err));
        history.push(routingPaths.movies);
    };

    const startEdit = (movie: Movie) => {
        setSelectedMovie(movie);
        history.push(`${routingPaths.moviesEdit}/${movie.id}`);
    };

    const handleEditSubmit = (movie: Movie) => {
        const {actors, ...rest} = movie;
        console.log({...rest, actors: actors.map(a => a.name)});
        editMovie({variables: {...rest, actors: actors.map(a => a.name)}}).catch(err => console.log(err));
        setSelectedMovie(null);
    };

    const handleDeleteMovie = (movie: Movie) => {
        deleteMovie({variables: {id: movie.id}}).catch(err => console.log(err));
        setSelectedMovie(null);
    };

    const selectRowAction = (movie: Movie) => {
        history.push(`${routingPaths.moviesDetail}/${movie.id}`);
    };

    const handleDialogClose = () => {
        history.push("/movies");
    };

    const handleRatingDialogClose = (movie: Movie) => {
        // setDialogMode(DialogMode.DETAIL);
        history.push(`${routingPaths.moviesDetail}/${movie.id}`);
    };

    const handleStartRating = (movie: Movie) => {
        history.push(`${routingPaths.moviesRate}/${movie.id}`);
    };

    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    return (
        <RootDiv>
            <HeaderDiv>
                <Typography variant={"h4"}>
                    {"Movies"}
                </Typography>
                <SearchFieldWrapper>
                    <SearchInput text={searchText} setText={setSearchText}/>
                </SearchFieldWrapper>
                <Button
                    variant={"contained"}
                    color="primary"
                    startIcon={<AddIcon/>}
                    onClick={startCreate}
                >{"Add Movie"}</Button>
            </HeaderDiv>
            <MovieTable
                onRowSelect={selectRowAction}
                onDeleteMovie={handleDeleteMovie}
                onEditMovie={startEdit}
                filterBy={searchText}
                movies={movies}
            />
            <Route path={routingPaths.movies + "/:movieId"}>
                <Dialog
                    fullWidth={true}
                    maxWidth={"md"}
                    fullScreen={fullScreen}
                    open={selectedMovie != null}
                    onClose={handleDialogClose}
                    TransitionComponent={Transition}
                >
                    {dialogMode === DialogMode.DETAIL &&
                    <MovieDetailView
                        movie={selectedMovie !== null ? selectedMovie : emptyMovie}
                        onDialogClose={handleDialogClose}
                        onEditMovie={startEdit}
                        onDeleteMovie={handleDeleteMovie}
                        onStartRating={handleStartRating}
                    />
                    }
                    {(dialogMode === DialogMode.CREATE || dialogMode === DialogMode.EDIT) && <CreateEditMovieDialog
                        onCancel={handleDialogClose}
                        onSave={dialogMode === DialogMode.EDIT ? handleEditSubmit : handleCreateSubmit}
                        title={dialogMode === DialogMode.EDIT ? "Edit Movie" : "Add New Movie"}
                        movie={selectedMovie !== null ? selectedMovie : emptyMovie}
                    />
                    }
                    {dialogMode === DialogMode.RATING && <CreateRatingDialog
                        onDialogClose={handleRatingDialogClose}
                        movie={selectedMovie !== null ? selectedMovie : emptyMovie}
                    />
                    }
                </Dialog>
            </Route>

            <Notifications/>
        </RootDiv>

    );
}

/**
 * Styled Components
 */
const RootDiv = styled("div")`
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow-y: auto;
`;

const HeaderDiv = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media(max-width: 500px) {
        flex-wrap: wrap;
    }
    > button {
        white-space: nowrap;
    }
`;

const SearchFieldWrapper = styled("div")`
    flex-grow: 1;
    max-width: 1000px;
    
    margin: 0 24px 0 24px;
    @media(max-width: 500px) {
        order: 1;
        margin: 16px 0 16px 0;
    }
`;

export default MoviePage;
