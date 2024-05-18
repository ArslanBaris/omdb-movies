/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu, MenuListboxSlotProps } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { ArrowDropDown } from '@mui/icons-material';
import { PaginationProps, TableState } from '../../types/Table';


const RestApiDataTablePagination: React.FC<PaginationProps> = ({
  page,
  totalCount,
  onPageChange,
  showPageSizeOptions,
  pageSizeOptions,
  showPageJump,
}) => {
  const [pageState, setPageState] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [ totalPages, setTotalPages ] = useState(0);

  useEffect(() => {
    setPageState(page);
    setTotalPages(Math.ceil(totalCount/ 10));
  }, [ page,totalCount]);


  const renderPageJump = () => {
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i += 1) {
      pageNumbers.push(
        <MenuItem key={i} onClick={() => onPageChange(i)}>
          {i + 1}
        </MenuItem>
      );
    }
    return pageNumbers;
  };

  const handleChange = (event:any, value:any) => {
    if (value !== pageState + 1) {
      setPageState(value-1);
      onPageChange(value-1);
    }
  };

  return (
    <>
      <Stack className='px-2 mt-4 justify-between flex-wrap' direction={"row"} spacing={2} useFlexGap>

        {showPageJump ? (
          <div className="float-left pt-2">
            <span className="text-muted text-small mr-1">Page </span>
            <Dropdown>
              <MenuButton> {pageState + 1} <ArrowDropDown /> </MenuButton>
              <Menu style={{height:"200px"}} slots={{ listbox: Listbox }}>
                {renderPageJump()}
              </Menu>
            </Dropdown>
            <span> of </span>
            {totalPages}
          </div>
        ) : (
          <div className="float-left pt-2">
            <span className="text-muted text-small mr-1">Page </span>
            <span>{pageState + 1} of {totalPages}</span>
          </div>)
        }
        <Pagination count={totalPages} page={pageState+1} color="primary" variant="outlined" showFirstButton showLastButton onChange={handleChange} />
     
      </Stack>

    </>
  );
};
export default RestApiDataTablePagination;


const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  z-index: 1;
  max-height:270px;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: .76rem;
  line-height: 1.3;
  padding: .25rem .75rem;
  border-radius: 25px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `,
);