import React from "react";
import {IconButton, Snackbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {useQuery, useSubscription} from "@apollo/react-hooks";
import {GET_CURRENT_USER, SUB_MOVIE_ACTION, SUB_RATING_ADDED} from "../api/queries";
import {GetCurrentUser, MovieAction} from "../api/types";

function Notifications() {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const { data } = useQuery<GetCurrentUser>(GET_CURRENT_USER);
    let userId = data ? data.currentUser.id : "";

    function updateMessage(message: string) {
        setOpen(false);
        setMessage(message);
        setOpen(true);
    }

    useSubscription<MovieAction>(SUB_MOVIE_ACTION, {
        onSubscriptionData: ({ subscriptionData}) => {
            if (subscriptionData.data?.movieAction.user.id !== userId) {
                switch (subscriptionData.data?.movieAction.type) {
                    case "added":
                        updateMessage("Movie \"" + subscriptionData.data.movieAction.movie.name + "\" added by " + subscriptionData.data.movieAction.user.username);
                        break;
                    case "edited":
                        updateMessage("Movie \"" + subscriptionData.data.movieAction.movie.name + "\" edited by " + subscriptionData.data.movieAction.user.username);
                        break;
                    case "deleted":
                        updateMessage("Movie \"" + subscriptionData.data.movieAction.movie.name + "\" deleted by " + subscriptionData.data.movieAction.user.username);
                        break;
                    default:

                }
            } else if (subscriptionData.data?.movieAction.user.id === userId) {
                switch (subscriptionData.data?.movieAction.type) {
                    case "added":
                        updateMessage("Movie added");
                        break;
                    case "edited":
                        updateMessage("Movie edited");
                        break;
                    case "deleted":
                        updateMessage("Movie deleted");
                        break;
                    default:

                }
            }
        }
    });

    useSubscription(SUB_RATING_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            if (subscriptionData.data.ratingAdded.user.id !== userId) {
                updateMessage("Movie \"" + subscriptionData.data.ratingAdded.movie.name + "\" rated by " + subscriptionData.data.ratingAdded.user.username);
            }
        }
    });

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            open={open}
            autoHideDuration={2500}
            onClose={handleClose}
            message={message}
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </React.Fragment>
            }
        />
    );
}

export default Notifications;
