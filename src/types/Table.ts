export interface RestApiTableProps {
    columns: any[];
    handleRowClick?: (row: any) => void;
    getData: any;
    manuelPagination?: boolean;
    defaultPageSize?: number;
    pageSizeOptions?: number[];
  }
  

export interface TableState {
    page: number;
    pageSize: number;
    filter?: Record<string, any>;
}

export interface PaginationProps {
    page:number;
    totalCount:number;
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