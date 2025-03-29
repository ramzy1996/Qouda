import {
  PaginationResult,
  ResponseWrapper,
  TPaginationQueryParams,
} from '@/types/api';
import { ExcelItem, TUploadExcelData } from '@/types/excel';

import apiClient from '../Base/apiClient';

async function uploadExcel(payload: TUploadExcelData) {
  const formData = new FormData();
  formData.append('file', payload.file);

  return await apiClient.post<ResponseWrapper<{ message: string }>>(
    '/exceldata/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}

async function fetchExcelList(
  params: TPaginationQueryParams,
): Promise<PaginationResult<ExcelItem>> {
  const response = await apiClient.get<
    ResponseWrapper<PaginationResult<ExcelItem>>
  >('/exceldata/getall', { params });
  return response.data.data; // Extract the nested data
}

async function fetchExcelDownload() {
  const response = await apiClient.get('exceldata/download', {
    responseType: 'blob',
  });
  return response.data;
}

export { fetchExcelDownload, fetchExcelList, uploadExcel };
