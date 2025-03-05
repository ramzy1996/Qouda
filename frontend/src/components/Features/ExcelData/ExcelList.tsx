import React, { useEffect } from 'react';
import {
  createListCollection,
  Flex,
  Heading,
  HStack,
  Stack,
  Table,
} from '@chakra-ui/react';

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { useFetchExcelList } from '@/hooks/Excel/useFetchExcelList';
import { TPaginationQueryParams } from '@/types/api';

const ExcelList = () => {
  const initialParams = {
    pageNumber: 1,
    pageSize: 10,
  };

  const [pagination, setPagination] =
    React.useState<TPaginationQueryParams>(initialParams);

  const { data, refetch } = useFetchExcelList({
    params: pagination,
  });

  useEffect(() => {
    refetch();
  }, [pagination, refetch]);

  const excelData = data || {
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  };
  console.log(excelData);

  const handlePageChange = (pageNumber: number) => {
    setPagination((prevPagination) => ({ ...prevPagination, pageNumber }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination((prevPagination) => ({ ...prevPagination, pageSize }));
  };

  const pageSizes = createListCollection({
    items: [
      { label: '10', value: '10' },
      { label: '20', value: '20' },
      { label: '50', value: '50' },
    ],
  });

  return (
    <Stack width="full" gap="5">
      <Heading size="xl">Excel Data</Heading>
      <Table.ScrollArea borderWidth="1px" rounded="md" height="200px">
        <Table.Root size="sm" stickyHeader interactive>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>First Name</Table.ColumnHeader>
              <Table.ColumnHeader>Last Name</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                Phone Number
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body colorPalette="gray">
            {excelData.items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.firstName}</Table.Cell>
                <Table.Cell>{item.lastName}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell textAlign="end">{item.phoneNumber}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <Flex justifyContent="space-between">
        <PaginationRoot
          count={excelData.totalCount}
          pageSize={pagination.pageSize}
          page={pagination.pageNumber}
          defaultPage={1}
          variant="solid"
          onPageChange={(info) => {
            console.log(info);
            setPagination((prevPagination) => ({
              ...prevPagination,
              pageNumber: info.page,
              pageSize: info.pageSize,
            }));
          }}
        >
          <HStack wrap="wrap">
            <PaginationPrevTrigger
              onChange={() =>
                handlePageChange(
                  pagination.pageNumber ?? initialParams.pageNumber - 1,
                )
              }
              disabled={pagination.pageNumber === 1}
            />
            <PaginationItems />
            <PaginationNextTrigger
              onChange={() =>
                handlePageChange(
                  pagination.pageNumber ?? initialParams.pageNumber + 1,
                )
              }
              disabled={(pagination.pageNumber ?? 1) === excelData.totalPages}
            />
          </HStack>
        </PaginationRoot>
        <SelectRoot
          collection={pageSizes}
          size="sm"
          width="50px"
          defaultValue={[pageSizes.items[0].value.toString()]}
          onValueChange={(e: any) => {
            console.log(e);
            handlePageSizeChange(parseInt(e.value));
          }}
        >
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectContent>
            {pageSizes.items.map((size) => (
              <SelectItem item={size} key={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Flex>
    </Stack>
  );
};

export default ExcelList;
