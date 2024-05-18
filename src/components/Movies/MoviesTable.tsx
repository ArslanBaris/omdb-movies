import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { apiKey, apiUrl } from '../../constants/defaultValues';
import {
  createColumnHelper,
  Table as ReactTable,
} from '@tanstack/react-table'
import { Card, Button, Grid, IconButton } from '@mui/material'
import { AccessTime, Draw, Inventory, PublishedWithChanges, Settings, Star, Stars } from '@mui/icons-material';
import { TableState } from '../../types/Table';
import { RestApiTable } from '../../common/Table/RestApiTable';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface Params {
  apikey: string;
  page: number;
  s?: string;
  y?: string;
  type?: string;
}

const MoviesTable = () => {

  const [tableLoader, setTableLoader] = useState(false)

  const navigate = useNavigate()

  const validateFilterObject = (filter: any) => {
    if(filter?.Title?.length > 2 || filter?.Year?.length > 2 || filter?.Type?.length > 2) {
      setTableLoader(true)
      return true
    } else {
      return false
    }
  }

  const getMovies = async (tableState: any) => {

    if(!validateFilterObject(tableState?.filter)) 
      return

    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        apikey: `${apiKey}`,
        page: tableState?.page + 1,
        s:"Pokemon"
      } as Params
    }

    if(tableState?.filter?.Title) {
      config.params.s = tableState?.filter?.Title
    }
    if(tableState?.filter?.Year) {
      config.params.y = tableState?.filter?.Year
    }

    if(tableState?.filter?.Type) {
      config.params.type = tableState?.filter?.Type
    }

    return await axios.get(`${apiUrl}`, config).
      then((resp) => {
        setTableLoader(false)
        return resp.data
      }).catch((err) => {
        console.log(err)
      })

  }

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
    <Grid container className='' >
      <Grid item xs={12}  >
        <RestApiTable
          columns={columns}
          pageSizeOptions={[1, 2, 3, 4, 10, 20, 30, 40, 50]}
          manuelPagination={true}
          loader={tableLoader}
          getData={handleTableState}
          handleRowClick={handleRowClick}
        />
      </Grid>
    </Grid>
  )
}

export default MoviesTable