import { useQuery } from '@tanstack/react-query';

import { fetchExcelDownload } from '@/api/Excel/excelApi';
import { QueryConfig } from '@/types/react-query';

export const getExcelDownloadOptions = () => ({
  queryKey: ['excelDownload'],
  queryFn: () => fetchExcelDownload(),
});

type UseFetchExcelDownloadOptions = {
  queryConfig?: QueryConfig<typeof getExcelDownloadOptions>;
};

export const useFetchExcelDownload = ({
  queryConfig,
}: UseFetchExcelDownloadOptions = {}) => {
  return useQuery({
    ...getExcelDownloadOptions(),
    ...queryConfig,
    enabled: false, // don't fetch data on mount
  });
};
