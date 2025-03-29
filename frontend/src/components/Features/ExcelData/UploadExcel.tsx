import React, { useState } from 'react';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { IoSaveOutline } from 'react-icons/io5';
import { Box, Button, HStack } from '@chakra-ui/react';
import saveAs from 'file-saver';
import * as XLSX from 'xlsx';

import { DownloadExcelButton } from '@/components/Molecules/DownloadExcelButton/DownloadExcelButton';
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '@/components/ui/file-upload';
import { toaster } from '@/components/ui/toaster';
import { useUploadExcel } from '@/hooks/Excel/useUploadExcel';
const UploadExcel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const mutation = useUploadExcel({
    mutationConfig: {
      onSuccess: (data) => {
        toaster.success({
          title: 'Upload successful',
          description: data.data.message,
        });
      },
      onError: (error) => {
        toaster.error({
          title: 'Upload failed',
          description: error.message,
        });
        alert(`Error: ${(error as any)?.message || 'Upload failed'}`);
      },
    },
  });

  const handleFileChange = (details: { files: File[] }) => {
    if (details.files?.length) {
      setFile(details.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      toaster.create({
        title: 'Please select a file',
        description: 'Please select a file first.',
        type: 'warning',
        removeDelay: 500,
      });
      //   alert(`Error: Please select a file first.`);
      return;
    }

    mutation.mutate({ file });
  };

  const handleDownload = () => {
    // Define headers and sample data
    const headers = [['FirstName', 'LastName', 'Email', 'PhoneNumber']];

    // Create a new worksheet
    const ws = XLSX.utils.aoa_to_sheet([...headers, []]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(dataBlob, 'Template.xlsx');
  };

  return (
    <Box width="full">
      <FileUploadRoot
        maxW="xl"
        alignItems="stretch"
        maxFiles={1}
        onFileAccept={handleFileChange}
        allowDrop
        accept={['.xlsx', '.xls', '.csv']}
      >
        <FileUploadDropzone
          label="Drag and drop here to upload"
          description=".xlsx, .xlx and .csv files are accepted"
        />
        <FileUploadList />
      </FileUploadRoot>

      <HStack gap={5} my={5}>
        <Button
          colorPalette="blue"
          variant="solid"
          loading={mutation.isPending}
          onClick={handleSubmit}
          loadingText="Uploading..."
        >
          <IoSaveOutline />
          Upload
        </Button>

        <Button colorPalette="border" variant="solid" onClick={handleDownload}>
          <FaCloudDownloadAlt />
          Download Template
        </Button>
        <DownloadExcelButton />
      </HStack>
    </Box>
  );
};

export default UploadExcel;
