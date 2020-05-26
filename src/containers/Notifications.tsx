import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {useQuery, useSubscription} from "@apollo/react-hooks";
import {GET_CURRENT_USER, SUB_MOVIE_ADDED, SUB_MOVIE_DELETED, SUB_MOVIE_EDITED, SUB_RATING_ADDED} from "../api/queries";
import {GetCurrentUser} from "../api/types";

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

    useSubscription(SUB_MOVIE_ADDED, {
        onSubscriptionData: ({ subscriptionData}) => {
            if (subscriptionData.data.movieAdded.user.id !== userId) {
                updateMessage("Movie \"" + subscriptionData.data.movieAdded.movie.name + "\" added by " + subscriptionData.data.movieAdded.user.username);
            }
        }
    });

    useSubscription(SUB_MOVIE_DELETED, {
        onSubscriptionData: ({ subscriptionData}) => {
            if (subscriptionData.data.movieDeleted.user.id !== userId) {
                updateMessage("Movie \"" + subscriptionData.data.movieDeleted.movie.name + "\" deleted by " + subscriptionData.data.movieDeleted.user.username);
            }
        },
    });

    useSubscription(SUB_MOVIE_EDITED, {
        onSubscriptionData: ({ subscriptionData}) => {
            if (subscriptionData.data.movieEdited.user.id !== userId) {
                updateMessage("Movie \"" + subscriptionData.data.movieEdited.movie.name + "\" edited by " + subscriptionData.data.movieEdited.user.username);
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
            autoHideDuration={6000}
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
