export interface RestApiTableProps {
    columns: any[];
    loader: boolean;
    handleRowClick?: (row: any) => void;
    getData: any;
    manuelPagination?: boolean;
    defaultPageSize?: number;
    pageSizeOptions?: number[];
  }
  

export interface TableState {
    page: number;
    pageSize: number;
    totalCount: number;
    filter?: Record<string, any>;
}

export interface PaginationProps {
    tableState: TableState;
    onPageChange: (page: number) => void;
    showPageSizeOptions: boolean;
    pageSizeOptions: number[];
    showPageJump: boolean;
  }
  

export interface DebouncedInputProps {
    value: any;
    onChange: (value: any) => void;
    debounce?: number;
    type: string;
    placeholder: string;
    className: string;
    list?: string;
    min?: number;
    max?: number;
  }