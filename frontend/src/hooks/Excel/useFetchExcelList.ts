import { useQuery } from '@tanstack/react-query';

import { fetchExcelList } from '@/api/Excel/excelApi';
import { TPaginationQueryParams } from '@/types/api';
import { QueryConfig } from '@/types/react-query';

export const getExcelListOptions = (params: TPaginationQueryParams) => ({
  queryKey: ['excelList', params],
  queryFn: () => fetchExcelList(params),
});

type UseFetchExcelListOptions = {
  params: TPaginationQueryParams;
  queryConfig?: QueryConfig<typeof getExcelListOptions>;
};

export const useFetchExcelList = ({
  params,
  queryConfig,
}: UseFetchExcelListOptions) => {
  return useQuery({
    ...getExcelListOptions(params),
    ...queryConfig,
  });
};
