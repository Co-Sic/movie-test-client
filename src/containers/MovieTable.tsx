import React from "react";
import styled from "styled-components";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody, IconButton, Tooltip,
} from "@material-ui/core";
import {useQuery} from "@apollo/react-hooks";
import {GetMovie, Movie} from "../api/types";
import { GET_MOVIES} from "../api/queries";
import formatDuration from "../__helper__/formatDuration";
import StarIcon from '@material-ui/icons/Star';
import EditIconOutlined from "@material-ui/icons/EditOutlined";
import DeleteIconOutlined from "@material-ui/icons/DeleteOutlined";


interface TableColumn {
    label: String,
    hideBelowWidth: number,
    accessor: (value: Movie) => string | number | JSX.Element,
}

interface MovieTableProps {
    onRowSelect: (movie: Movie) => void;
    onEditMovie: (movie: Movie) => void;
    onDeleteMovie: (movie: Movie) => void;
}


function MovieTable(props: MovieTableProps) {

    const anchorRef = React.useRef<any>(null);

    const tableColumns: TableColumn[] = [
        {label: "Title", hideBelowWidth: 0, accessor: m => m.name},
        {label: "Release Date", hideBelowWidth: 800, accessor: m => new Date(m.releaseDate).getFullYear()},
        {label: "Duration", hideBelowWidth: 1000, accessor: m => formatDuration(m.durationSeconds)},
        {
            label: "Average Rating", hideBelowWidth: 400,
            accessor: m => (
                <RatingCell>
                    {"0/5"}
                    <StarIcon fontSize="small"/>

                </RatingCell>
            )
        }
    ];

    const {
        data,
        loading,
        error
    } = useQuery<GetMovie>(GET_MOVIES);
    console.log(data);

    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    return (
        <StyledTable ref={anchorRef}>
            <TableHead>
                <TableRow>
                    {tableColumns.map((col: TableColumn) =>
                        <ResponsiveTableCell key={"col_" + col.label} maxWidth={col.hideBelowWidth}>
                            {col.label}
                        </ResponsiveTableCell>)}
                    <ResponsiveTableCell key={"actions"} maxWidth={200}/>
                </TableRow>
            </TableHead>
            <TableBody>
                {data?.movies.map((m: Movie) =>
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
                                {col.accessor(m)}
                            </ResponsiveTableCell>)
                        }
                        <TableCell className={"table-cell-min"}>
                            <ActionButtonWrapper>
                                <Tooltip title={"Edit Movie"}>
                                    <IconButton
                                        size={"small"}
                                        className={"table-action-button"}
                                    onClick={(e) => {e.stopPropagation(); props.onEditMovie(m);}}
                                    >
                                        <EditIconOutlined fontSize={"small"}/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={"Delete Movie"}>
                                    <IconButton
                                        size={"small"}
                                        className={"table-action-button"}
                                        onClick={(e) => {e.stopPropagation(); props.onDeleteMovie(m);}}
                                    >
                                        <DeleteIconOutlined fontSize={"small"}/>
                                    </IconButton>
                                </Tooltip>

                            </ActionButtonWrapper>
                        </TableCell>
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
    > svg {
        color: #e7711b;
        margin-left: 2px;
        position:relative;
        bottom: 2px;
    }
`;

const ActionButtonWrapper = styled("div")`
    display: flex;
    flex-direction: row;
`;

export default MovieTable;
