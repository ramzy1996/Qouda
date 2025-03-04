import { Heading, Stack, Table } from '@chakra-ui/react';

import { useFetchExcelList } from '@/hooks/Excel/useFetchExcelList';
import { TPaginationQueryParams } from '@/types/api';

interface ExcelListProps {
  initialParams?: TPaginationQueryParams;
}

const ExcelList: React.FC<ExcelListProps> = ({ initialParams }) => {
  const { data, isLoading, isError, error } = useFetchExcelList({
    params: initialParams || { pageNumber: 1, pageSize: 10 },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as any)?.message}</div>;
  const excelData = data || {
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  };
  console.log(excelData);

  return (
    <Stack width="full" gap="5">
      <Heading size="xl">Excel Data</Heading>
      <Table.ScrollArea
        borderWidth="1px"
        rounded="md"
        height="200px"
        className="bg-gray-500 text-black"
      >
        <Table.Root size="sm" variant="outline" stickyHeader>
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
          <Table.Body>
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

      {/* <PaginationRoot count={excelData.items.length * 5} pageSize={5} page={1}>
        <HStack wrap="wrap">
          <PaginationPrevTrigger
            onClick={() => {
              console.log('Previous');
            }}
          />
          <PaginationItems
            onClick={(e) => {
              console.log(e);
            }}
          />
          <PaginationNextTrigger
            onClick={() => {
              console.log('Next');
            }}
          />
        </HStack>
      </PaginationRoot> */}
    </Stack>
  );
};

export default ExcelList;
