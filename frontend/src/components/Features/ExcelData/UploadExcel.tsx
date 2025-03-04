import React, { useState } from 'react';
import { IoSaveOutline } from 'react-icons/io5';
import { Button, HStack } from '@chakra-ui/react';

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

  return (
    <div className="w-full">
      {/* <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" /> */}

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
        ></FileUploadDropzone>
        <FileUploadList />
      </FileUploadRoot>

      <HStack className="m-5">
        <Button
          colorPalette="teal"
          className="bg-blue-500 p-3 w-[200px]"
          variant="solid"
          loading={mutation.isPending}
          onClick={handleSubmit}
        >
          <IoSaveOutline />
          {mutation.isPending ? 'Uploading...' : 'Upload Excel'}
        </Button>
      </HStack>

      {/* <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Uploading...' : 'Upload Excel'}
      </button> */}
    </div>
  );
};

export default UploadExcel;
