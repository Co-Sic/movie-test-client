import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel} from "@material-ui/core";
import {Movie} from "../api/types";
import formatDuration from "../__helper__/formatDuration";
import Star from "../components/Star";
import {DeleteMovieButton, EditMovieButton} from "../components/actions";

interface TableColumn {
    id: string,
    label: string,
    hideBelowWidth: number,
    accessor: (value: Movie) => string | number | JSX.Element,
    sort: (e1: Movie, e2: Movie, order: (1 | -1)) => number,
}

interface MovieTableProps {
    onRowSelect: (movie: Movie) => void;
    onEditMovie: (movie: Movie) => void;
    onDeleteMovie: (movie: Movie) => void;
    filterBy: string;
}


const tableColumns: TableColumn[] = [
    {
        id: "title", label: "Title", hideBelowWidth: 0, accessor: m => m.name,
        sort: (e1: Movie, e2: Movie, order: (1 | -1)) => e1.name.localeCompare(e2.name) * order
    },
    {
        id: "releaseDate",
        label: "Release Date",
        hideBelowWidth: 700,
        accessor: m => new Date(m.releaseDate).getFullYear(),
        sort: (e1: Movie, e2: Movie, order: (1 | -1)) => (new Date(e1.releaseDate).getTime() - new Date(e2.releaseDate).getTime()) * order
    },
    {
        id: "duration", label: "Duration", hideBelowWidth: 900, accessor: m => formatDuration(m.durationSeconds),
        sort: (e1: Movie, e2: Movie, order: (1 | -1)) => (e1.durationSeconds - e2.durationSeconds) * order
    },
    {
        id: "averageRating", label: "Rating", hideBelowWidth: 350,
        accessor: m => (
            <RatingCell >
                {m.averageRating.toFixed(1) + ""}
                <Star variant="full" gray={m.ratingCount === 0}/>
                {"(" + m.ratingCount + ")"}
            </RatingCell>
        ),
        sort: (e1: Movie, e2: Movie, order: (1 | -1)) => (e1.averageRating - e2.averageRating) * order,
    }
];

function MovieTable(props: MovieTableProps) {

    const anchorRef = React.useRef<any>(null);

    const [sortId, setSortId] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<("asc" | "desc")>("asc");

    // Fetch sort order from local storage on component mount
    useEffect(() => {
        let order = localStorage.getItem("tableSortOrder");
        let id = localStorage.getItem("tableSortId");
        setSortId(id ? id : "");
        setSortOrder(order ? order === "asc" ? order : "desc" : "asc")

    }, []);

    function changeOrder(colId: string) {
        if (colId === sortId) {
            let newOrder: ("asc" | "desc") = sortOrder === "asc" ? "desc" : "asc";
            setSortOrder(newOrder);
            localStorage.setItem("tableSortOrder", newOrder);
        } else {
            setSortId(colId);
            localStorage.setItem("tableSortId", colId);
        }

    }

    const {
        data,
        loading,
        error
    } = useFetchMovies();

    let movies: Movie[] = [];
    if (data?.movies) {
        movies = data.movies;
    }
    // filter data
    const filteredData: Movie[] = useMemo(() => movies.filter(m => m.name.includes(props.filterBy)), [movies, props.filterBy]);

    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;


    // sort data
    let sortedData = filteredData;
    for (let i = 0; i < tableColumns.length; i++) {
        if (tableColumns[i].id === sortId) {
            sortedData = filteredData.sort((m1: Movie, m2: Movie) => tableColumns[i].sort(m1, m2, sortOrder === "asc" ? -1 : 1));
            break;
        }
    }

    return (
        <StyledTable ref={anchorRef}>
            <TableHead>
                <TableRow>
                    {tableColumns.map((col: TableColumn) =>
                        <ResponsiveTableCell key={"col_" + col.label} maxWidth={col.hideBelowWidth}>
                            <TableSortLabel
                                active={sortId === col.id}
                                direction={sortOrder}
                                onClick={() => changeOrder(col.id)}
                            >
                                {col.label}
                            </TableSortLabel>
                        </ResponsiveTableCell>)}
                    <ResponsiveTableCell key={"actions"} maxWidth={700}/>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedData.map((m: Movie) =>
                    <SelectableTableRow
                        key={m.id}
                        isActive
                        onClick={(event: MouseEvent) => {
                            if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
                                console.log("click");
                                props.onRowSelect(m);
                            }
                        }}
                    >
                        {tableColumns.map((col: TableColumn) =>
                            <ResponsiveTableCell key={col.label + " " + m.id} maxWidth={col.hideBelowWidth}>
                                <MinHeightWrapper>
                                    {col.accessor(m)}
                                </MinHeightWrapper>
                            </ResponsiveTableCell>)
                        }
                        <ResponsiveTableCell maxWidth={700} className={"table-cell-min"}>
                            <ActionButtonWrapper>
                                <EditMovieButton onEdit={() => props.onEditMovie(m)}/>
                                <DeleteMovieButton onDelete={() => props.onDeleteMovie(m)}/>
                            </ActionButtonWrapper>
                        </ResponsiveTableCell>
                    </SelectableTableRow>
                )}
            </TableBody>
        </StyledTable>
    )
}

/**
 * Styled Components
 */
const StyledTable = styled(Table)`

    .table-action-button {
        color: rgba(0, 0, 0, 0)
    }

    tbody {
        tr {
            td {
                padding-bottom: 2px;
                padding-top: 2px;
            }
            .table-cell-min {
               white-space: nowrap;
               width: 1px;
            }
        }
        tr:hover {
            .table-action-button {
                color: rgba(0, 0, 0, 0.87);
            }
        }
    }
     
`;

const ResponsiveTableCell = styled(({maxWidth: MaxWidthType, ...rest}) => <TableCell {...rest}/>)`
    ${props => props.maxWidth && `
    @media(max-width: ${props.maxWidth}px) {
        display: none;
    }
  `}
`;

const SelectableTableRow = styled(({isActive: boolean, ...rest}) => <TableRow {...rest}/>)`
${props => props.isActive && `:hover {
     cursor: pointer;
     background-color: rgb(245, 245, 245);
 }`}
`;

const RatingCell = styled("div")`
    display: inline-flex;
    vertical-align: middle;
`;

const ActionButtonWrapper = styled("div")`
    display: flex;
    flex-direction: row;
`;

const MinHeightWrapper = styled("div")`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 30px;
`;

export default MovieTable;
