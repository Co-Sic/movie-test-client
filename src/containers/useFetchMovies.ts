import {useQuery} from "@apollo/react-hooks";
import {GetMovies} from "../api/types";
import {GET_MOVIES, SUB_MOVIE_ACTION, SUB_RATING_ADDED} from "../api/queries";

function useFetchMovies() {
    const {
        subscribeToMore,
        refetch,
        data,
        loading,
        error
    } = useQuery<GetMovies>(GET_MOVIES);
    console.log(data);

    subscribeToMore({
        document: SUB_MOVIE_ACTION,
        updateQuery: (prev) => {
            refetch();
            return prev;
        }
    });

    subscribeToMore({
        document: SUB_RATING_ADDED,
        updateQuery: (prev) => {
            refetch();
            return prev;
        }
    });

    return {
        data,
        loading,
        error
    }
}

export default useFetchMovies;
