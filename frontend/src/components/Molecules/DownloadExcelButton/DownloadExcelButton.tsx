import { FiDownloadCloud } from 'react-icons/fi';
import { Button } from '@chakra-ui/react';

import { useFetchExcelDownload } from '@/hooks/Excel/useDownloadExcelData';

export const DownloadExcelButton = () => {
  const { error, isLoading, refetch } = useFetchExcelDownload();

  const handleDownload = async () => {
    try {
      const response = await refetch();
      if (response.data) {
        const url = URL.createObjectURL(response.data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ExcelData.xlsx';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  if (isLoading) {
    return <Button loading>Loading...</Button>;
  }

  if (error) {
    return <Button onClick={handleDownload}>Download failed, try again</Button>;
  }

  return (
    <Button onClick={handleDownload}>
      <FiDownloadCloud />
      Download All Data
    </Button>
  );
};
