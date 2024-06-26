import { useEffect, useState } from 'react'
import { TextField, Grid } from '@mui/material'
import {
  Table as ReactTable,
} from '@tanstack/react-table'
import { DebouncedInputProps } from '../../types/Table'
import { getValue } from '@testing-library/user-event/dist/utils'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setTitleFilter, setYearFilter } from '../../redux/actions'

export default function Filter({
  column,
  table,
  filterData,
}: {
  column: any
  table: ReactTable<any>
  filterData: (column: any, value: any) => void,
}) {

  const { yearFilter, titleFilter } = useSelector((state: any) => state.movies);
  const dispatch = useDispatch();


  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const filterFunction = (column: any, value: any) => {
    if (column.id === "Title")
      dispatch(setTitleFilter(value))
    if (column.id === "Year")
      dispatch(setYearFilter(value))
  }

  const getValue = () => {
    if (column.id === "Title")
      return titleFilter
    if (column.id === "Year")
      return yearFilter
  }

  return typeof firstValue === 'number' ?
    (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue)?.[0] ?? ''}
            onChange={value => { filterFunction(column, [value, columnFilterValue?.[1] ?? '']) }}
            placeholder={`Min ${column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
              }`}
            className="w-24 rounded"
          />
        </Grid>
        <Grid item xs={6}>
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue)?.[1] ?? ''}
            onChange={value => { filterFunction(column, [columnFilterValue?.[0] ?? '', value]) }}
            placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
              }`}
            className="w-24 rounded"
          />
        </Grid>
      </Grid>
    ) : (
      <>
        <DebouncedInput
          type="text"
          value={getValue()}
          onChange={value => { filterFunction(column, value) }}
          placeholder={`Search...`}
          className="w-36   rounded"
          list={column.id + 'list'}
        />
      </>
    )
}



// A debounced input react component
const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <TextField
      {...props}
      variant="outlined"
      size="small"
      margin="dense"
      value={value}
      onChange={e => setValue(e.target.value)}
      key="providerNameTextField"
    />
  )
}
