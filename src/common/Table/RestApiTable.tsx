import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, InputBase, Paper, TextField, Grid, CircularProgress } from '@mui/material'
import {
  Column,
  Table as ReactTable,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Warning } from '@mui/icons-material'
import { rankItem } from '@tanstack/match-sorter-utils'
// import { Oval } from 'react-loader-spinner'
import { useQuery } from '@tanstack/react-query'
import RestApiDataTablePagination from '../Pagination/RestApiDatatablePagination'
import Filter from '../Filter/Filter'
import { RestApiTableProps, TableState } from '../../types/Table'
import { useSelector } from 'react-redux'
// import RestApiDataTablePagination from '../Pagination/RestApiDatatablePagination'

const customFilterFunction = (row: any, columnId: string, value: any, addMeta: any) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta(itemRank);
  return itemRank.passed;
};

export const RestApiTable: React.FC<RestApiTableProps> = ({
  columns,
  loader,
  handleRowClick,
  getData,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
}) => {

  const { yearFilter, typefilter, titleFilter } = useSelector((state: any) => state.movies);

  const [tableState, setTableState] = useState<TableState>({
    page: 0,
    pageSize: defaultPageSize,
    totalCount: 0,
    filter: {},
  });

  const { status, data, error, isFetching } = useQuery({
    queryKey: ['tableState', tableState],
    queryFn: () => {
      if (getData) {
        return getData(tableState);
      } else {
        throw new Error('getData function is undefined');
      }
    },
  })

  const table = useReactTable({
    data: data?.Search || [],
    columns,
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
        pageIndex: tableState.page,
      },
    },
    filterFns: {
      numericSearch: customFilterFunction,
    },
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  })

  useEffect(() => {
    if (data && data.totalResults !== undefined) {
      setTableState(oldState => ({
        ...oldState,
        totalCount: parseInt(data.totalResults),
      }));
    }
  }, [data]);

  useEffect(() => {
    console.log(typefilter)
    setTableState(oldState => ({
      ...oldState,
      page: 0,
      filter: { ...oldState.filter, Title: titleFilter, Year: yearFilter, Type: typefilter }
    }));
  }, [yearFilter, typefilter, titleFilter]);


  // Pagination methods - START
  const onPageChange = (page: number) => {
    setTableState((old) => ({ ...old, page: page }))
  }
  // Pagination methods - END

  // Filter-Sort methods - START
  const filterData = (column: any, value: any) => {
    setTableState((old) => ({ ...old, filter: { ...old.filter, [column]: value } }))
  }

  const [activeRows, setActiveRows] = useState<boolean[]>([]);

  const handleMouseEnter = (rowIndex: number) => {
    setActiveRows((prevActiveRows) => {
      const newActiveRows = [...prevActiveRows];
      newActiveRows[rowIndex] = true;
      return newActiveRows;
    });
  };

  const handleMouseLeave = (rowIndex: number) => {
    setActiveRows((prevActiveRows) => {
      const newActiveRows = [...prevActiveRows];
      newActiveRows[rowIndex] = false;
      return newActiveRows;
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} className={``} >
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell key={header.id} style={{ fontSize: "20px", textAlign: "center", verticalAlign: "top" }}>
                    {header.isPlaceholder
                      ? null : (
                        <>
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          <div>
                            {header.column.getCanFilter() ? (
                              <div>
                                {/* <Filter column={header.column} filterData={filterData} table={table} /> */}
                              </div>
                            ) : null}
                          </div>
                        </>
                      )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {
              loader ?
                <TableRow style={{ height: "400px", textAlign: "center" }}>
                  <TableCell colSpan={columns.length} style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <div className='d-flex justify-content-center w-100'>
                      <>
                        <CircularProgress />
                      </>
                    </div>
                  </TableCell>
                </TableRow> :
                data == null || data == undefined || data?.Response === "False" || data?.Search == 0  ?

                  <TableRow style={{ height: "300px", textAlign: "center" }} >
                    <TableCell colSpan={columns.length} style={{ textAlign: "center", verticalAlign: "middle" }}>
                      <span style={{ fontSize: "25px" }} >
                        <Warning sx={{ fontSize: "30px" }} /> {" "}
                        No data found
                      </span>
                    </TableCell>
                  </TableRow>
                  :
                  table.getRowModel().rows.map((row, rowIndex) => {
                    const isActive = activeRows[rowIndex];
                    return (
                      <TableRow key={row.id} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => { if (handleRowClick) { handleRowClick(row) } }} onMouseEnter={() => handleMouseEnter(rowIndex)} onMouseLeave={() => handleMouseLeave(rowIndex)} >
                        {row.getVisibleCells().map(cell => (
                          <TableCell key={cell.id} className='' sx={{ textAlign: "center", background: isActive ? "#e4e4e4" : "" }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  }) 
            }
          </TableBody>
        </Table>

      </TableContainer>

      <RestApiDataTablePagination
        tableState={tableState}
        onPageChange={onPageChange}
        showPageSizeOptions={true}
        pageSizeOptions={pageSizeOptions}
        showPageJump={true}
      />

    </Box>
  )
}
