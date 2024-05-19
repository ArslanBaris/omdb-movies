import React, { useCallback, useRef } from 'react'
import axios from 'axios';
import { apiKey, apiUrl } from '../../constants/defaultValues';
import {
  createColumnHelper,
} from '@tanstack/react-table'
import { Grid } from '@mui/material'
import { TableState } from '../../types/Table';
import { RestApiTable } from '../../common/Table/RestApiTable';
import { useNavigate } from 'react-router-dom';
import { Params } from '../../types/Movie';

const MoviesTable = () => {

  const cancelTokenRef = useRef<any>(null);

  const navigate = useNavigate()

  const validateFilterObject = (filter: any) => {
    if (!filter?.Title || filter?.Title?.length === 0)
      return false
    else
      return true
  }

  const getMovies = useCallback(async (tableState: any) => {

    if (!validateFilterObject(tableState?.filter))
      return { Search: [], totalResults: 0 }

    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Operation canceled due to new request.');
    }

    cancelTokenRef.current = axios.CancelToken.source();

    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        apikey: `${apiKey}`,
        page: tableState?.page + 1,
        s: "Pokemon"
      } as Params,
      cancelToken: cancelTokenRef.current.token,
    }

    if (tableState?.filter?.Title) {
      config.params.s = tableState?.filter?.Title
    }
    if (tableState?.filter?.Year) {
      config.params.y = tableState?.filter?.Year
    }

    if (tableState?.filter?.Type) {
      config.params.type = tableState?.filter?.Type
    }

    return await axios.get(`${apiUrl}`, config)
      .then((resp) => {
        if (resp.data.Response === "True")
          return resp.data
        else
          return { Search: [], totalResults: 0 }
      }).catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          console.error(err);
        }
      })

  }, [])

  const handleTableState = useCallback((tableState: TableState) => {
    return getMovies(tableState);
  }, [getMovies])

  const handleRowClick = (row: any) => {
    navigate(`/movie/${row.original.imdbID}`)
  }

  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor('imdbID', {
      cell: info => <strong>{info.getValue()}</strong>,
      header: "ID",
      enableSorting: false,
      enableColumnFilter: false,
    }),
    columnHelper.accessor('Title', {
      cell: info => info.getValue(),
      header: "Title",
      enableColumnFilter: true,
    }),
    columnHelper.accessor('Year', {
      cell: info => info.getValue(),
      header: "Year",
      enableSorting: false,
      enableColumnFilter: true,
    }),
  ]


  return (
    <Grid container className='px-2 md:px-10' >
      <Grid item xs={12}  >
        <RestApiTable
          columns={columns}
          pageSizeOptions={[1, 2, 3, 4, 10, 20, 30, 40, 50]}
          manuelPagination={true}
          getData={handleTableState}
          handleRowClick={handleRowClick}
        />
      </Grid>
    </Grid>
  )
}

export default MoviesTable