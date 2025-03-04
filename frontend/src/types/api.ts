export type TPaginationQueryParams = {
  pageNumber?: number;
  pageSize?: number;
  searchBy?: string;
  sortDirection?: 'asc' | 'desc' | '';
  sortBy?: string;
  orderBy?: string;
};

export type ResponseWrapper<T> = {
  data: T;
  success: boolean;
  message: string;
  timestamp: Date;
};

export type PaginationResult<T> = {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious?: boolean;
  hasNext?: boolean;
};
