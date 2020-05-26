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

enum DialogMode {
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

const emptyMovie: Movie = {
    id: "",
    name: "",
    durationSeconds: 0,
    releaseDate: "2020-01-01",
    actors: [],
    averageRating: 0,
    ratingCount: 0,
};


function HomePage() {

    const [addMovie] = useMutation(ADD_MOVIE, {
        refetchQueries:[{query: GET_MOVIES}]
    });

    const [deleteMovie] = useMutation(DELETE_MOVIE, {
        refetchQueries:[{query: GET_MOVIES}]
    });

    const [editMovie] = useMutation(EDIT_MOVIE);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [dialogMode, setDialogMode] = useState<DialogMode>(DialogMode.DETAIL);

    const startCreate = () => {
        setDialogMode(DialogMode.CREATE);
        setSelectedMovie(emptyMovie);
    };

    const handleCreateSubmit = (movie: Movie) => {

        const {id, actors, ...rest} = movie;
        addMovie({variables: {...rest, actors: actors.map(a => a.name)}}).catch(err => console.log(err));
        setSelectedMovie(null);
    };

    const startEdit = (movie: Movie) => {
        setDialogMode(DialogMode.EDIT);
        setSelectedMovie(movie);
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
        setDialogMode(DialogMode.DETAIL);
        setSelectedMovie(movie);
    };

    const handleDialogClose = () => {
        setSelectedMovie(null);
    };

    const handleRatingDialogClose = () => {
        setDialogMode(DialogMode.DETAIL);
    };

    const handleStartRating = () => {
        setDialogMode(DialogMode.RATING);
    };

    return (
        <RootDiv>
            <ButtonDiv>
                <Typography variant={"h4"}>
                    {"Movies"}
                </Typography>

                <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={startCreate}
                >{"Add Movie"}</Button>
            </ButtonDiv>
            <MovieTable
                onRowSelect={selectRowAction}
                onDeleteMovie={handleDeleteMovie}
                onEditMovie={startEdit}
            />
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
            <Notifications />
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

const ButtonDiv = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export default HomePage;
