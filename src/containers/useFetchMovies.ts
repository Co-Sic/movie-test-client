import {useQuery} from "@apollo/react-hooks";
import {GetMovies} from "../api/types";
import {GET_MOVIES, SUB_MOVIE_ADDED, SUB_MOVIE_DELETED, SUB_MOVIE_EDITED} from "../api/queries";

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
        document: SUB_MOVIE_DELETED,
        updateQuery: (prev) => {
            refetch();
            return prev;
        }
    });

    subscribeToMore({
        document: SUB_MOVIE_ADDED,
        updateQuery: (prev) => {
            refetch();
            return prev;
        }
    });

    subscribeToMore({
        document: SUB_MOVIE_EDITED,
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
