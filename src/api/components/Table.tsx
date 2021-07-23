import React, {useCallback, useState} from "react";
import './TableStyles.css'
// @ts-ignore
import {useFilters, useSortBy, useTable} from 'react-table'
import MaUTable from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import {CommonProps} from "@material-ui/core/OverridableComponent";
import TableRow, {TableRowTypeMap} from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {TableSortLabel} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface setProps {
    model: string
    year: string | number
}

// @ts-ignore
export default React.memo(function Table(props: any) {
    const {columns, data} = props
    const [label, setLabel] = useState("Выберите авто...")

    const [filterInput, setFilterInput] = useState("");

    // @ts-ignore
    const {getTableProps, headerGroups, rows, prepareRow, setFilter} = useTable({
            columns,
            data,
        },
        useFilters,
        useSortBy)
    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value || undefined!;
        setFilter('Марка и модель', value)
        setFilterInput(value);
    }, [setFilter])

    const setAutoLabel = useCallback(({model, year}: setProps): void => {
        setLabel(`Выбран автомобиль ${model} ${year} года выпуска`)
    }, [setLabel])

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                '& > *': {
                    margin: theme.spacing(1),
                    width: '25ch',
                },
            },
        }),
    );
    const classes = useStyles();

    return (<div style={{height: "100%", display: "flex", flexDirection: "column"}}>
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="outlined-secondary"
                        label="Search mark..."
                        variant="outlined"
                        color="secondary"
                        value={filterInput}
                        onChange={handleFilterChange}
                    />
                </form>
            </div>
            <div className={"table-wrap"}>
                <MaUTable {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map((headerGroup: {
                            getHeaderGroupProps: () => JSX.IntrinsicAttributes
                                & { component: React.ElementType }
                                & { hover?: boolean | undefined; selected?: boolean | undefined }
                                & CommonProps<TableRowTypeMap> & Pick<any, string | number | symbol>; headers: any[]
                        }) => {
                            return (
                                <TableRow {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <TableCell
                                            {...(column.id !== 'Марка и модель'
                                                ? column.getHeaderProps()
                                                : column.getHeaderProps(column.getSortByToggleProps()))}
                                        >
                                            {column.render('Header')}
                                            {column.id === 'Марка и модель' ? (
                                                <TableSortLabel
                                                    active={column.isSorted}
                                                    direction={column.isSortedDesc ? 'desc' : 'asc'}
                                                />
                                            ) : null}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableHead>
                    <TableBody>
                        {rows.map((row: {
                            original: any;
                            getRowProps: () => JSX.IntrinsicAttributes & { component: React.ElementType }
                                & { hover?: boolean | undefined; selected?: boolean | undefined }
                                & CommonProps<TableRowTypeMap> & Pick<any, string | number | symbol>; cells: any[]
                        }) => {
                            prepareRow(row)
                            return (
                                <TableRow {...row.getRowProps()} onClick={() => setAutoLabel({
                                    model: row.original["Марка и модель"],
                                    year: row.original["Стандарт"]
                                })}>
                                    {row.cells.map(cell => {
                                        return (
                                            <TableCell {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </MaUTable>
            </div>
            <div className={"label"}>{label}</div>
        </div>
    )
})

                       