import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import RestApiDataTablePagination from '../Pagination/RestApiDatatablePagination'
import { RestApiTableProps, TableState } from '../../types/Table'
import { useSelector } from 'react-redux'
import NoDataFound from '../NoDataFound/NoDataFound'
export const RestApiTable: React.FC<RestApiTableProps> = ({
  columns,
  handleRowClick,
  getData,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
}) => {

  const { yearFilter, typeFilter, titleFilter } = useSelector((state: any) => state.movies);

  const [tableState, setTableState] = useState<TableState>({
    page: 0,
    pageSize: defaultPageSize,
    filter: {},
  });

  const {  data  = { Search: [], totalResults: 0 }, isFetching } = useQuery({
    queryKey: ['tableState', tableState],
    queryFn: () => {
        return getData(tableState);
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
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  })

  useEffect(() => {
    setTableState(oldState => ({
      ...oldState,
      page: 0,
      filter: { ...oldState.filter, Title: titleFilter, Year: yearFilter, Type: typeFilter }
    }));
  }, [yearFilter, typeFilter, titleFilter]);

  // Pagination methods - START
  const onPageChange = (page: number) => {
    setTableState((old) => ({ ...old, page: page }))
  }
  // Pagination methods - END

  // Filter-Sort methods - START
  // const filterData = (column: any, value: any) => {
  //   setTableState((old) => ({ ...old, filter: { ...old.filter, [column]: value } }))
  // }

  const [activeRows, setActiveRows] = useState<boolean[]>([]);

  const handleMouseActivity = (rowIndex: number, isActive: boolean) => {
    setActiveRows((prevActiveRows) => {
      const newActiveRows = [...prevActiveRows];
      newActiveRows[rowIndex] = isActive;
      return newActiveRows;
    });
  };

  const renderTableBody = () => {
    if ( isFetching ) {
      return <TableRow style={{ height: "400px", textAlign: "center" }}>
        <TableCell colSpan={columns.length} style={{ textAlign: "center", verticalAlign: "middle" }}>
          <div className='d-flex justify-content-center w-100'>
            <>
              <CircularProgress />
            </>
          </div>
        </TableCell>
      </TableRow>
    }

    if (data?.Search.length === 0) {
      return <TableRow style={{ height: "300px", textAlign: "center" }} >
        <TableCell colSpan={columns.length} style={{ textAlign: "center", verticalAlign: "middle" }}>
          <NoDataFound />
        </TableCell>
      </TableRow>
    }

    return  table.getRowModel().rows.map((row, rowIndex) => {
      const isActive = activeRows[rowIndex];
      return (
        <TableRow key={row.id} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => { if (handleRowClick) { handleRowClick(row) } }} onMouseEnter={() => handleMouseActivity(rowIndex, true)} onMouseLeave={() => handleMouseActivity(rowIndex, false)} >
          {row.getVisibleCells().map(cell => (
            <TableCell key={cell.id} className='' sx={{ textAlign: "center", background: isActive ? "#e4e4e4" : "" }}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      )
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper} sx={{ boxShadow: "0 2px 5px 0 rgb(0 0 0 / 0.1)" }}>
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
          {renderTableBody()}
          </TableBody>
        </Table>

      </TableContainer>

      <RestApiDataTablePagination
        page={tableState?.page}
        totalCount={parseInt(data?.totalResults) || 0}
        onPageChange={onPageChange}
        showPageSizeOptions={true}
        pageSizeOptions={pageSizeOptions}
        showPageJump={true}
      />

    </Box>
  )
}
