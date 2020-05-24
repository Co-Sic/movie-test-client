import React from "react";
import styled from "styled-components";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";
import {useQuery} from "@apollo/react-hooks";
import {GetMovie, Movie} from "../api/types";
import {GET_MOVIES} from "../api/queries";
import formatDuration from "../__helper__/formatDuration";


interface TableColumn {
    label: String,
    hideBelowWidth: number,
    accessor: (value: Movie) => string | number,
}



function MovieTable() {

    const anchorRef = React.useRef<any>(null);

    const tableColumns: TableColumn[] = [
        {label: "Title", hideBelowWidth: 0, accessor: m => m.name},
        {label: "Release Date", hideBelowWidth: 800, accessor: m => new Date(m.releaseDate).getFullYear()},
        {label: "Duration", hideBelowWidth: 1000, accessor: m => formatDuration(m.durationSeconds)},
        {label: "Average Rating", hideBelowWidth: 400, accessor: m => "0/5"}
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
                            }
                        }}
                    >
                        {tableColumns.map((col: TableColumn) =>
                            <ResponsiveTableCell key={col.label + " " + m.id} maxWidth={col.hideBelowWidth}>
                                {col.accessor(m)}
                            </ResponsiveTableCell>)
                        }
                    </SelectableTableRow>)}
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

export default MovieTable;
