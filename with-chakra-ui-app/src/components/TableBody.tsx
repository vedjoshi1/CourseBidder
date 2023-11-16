import {
    Link as ChakraLink,
    Text,
    Code,
    List,
    ListIcon,
    ListItem,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Spacer,
  } from '@chakra-ui/react'


  interface ListingData {
    id: number;
    full_name: string;
    hours_since: number; 
    asking_price: number;
  }


  interface columns {
    label: string;
    accessor: string;
  }

  interface MyTableProps {
    tableData: ListingData[]; 
    columns: columns[];
  }

  const TableBody : React.FC<MyTableProps> = ({tableData, columns}) => {
    return (
        <Tbody>
         {tableData.map((data) => {
          return (
           <Tr key={data.id}>
            {columns.map(({ accessor }) => {
             const tData = data[accessor] ? data[accessor] : "——";
             return <Td key={accessor}>{tData}</Td>;
            })}
           </Tr>
          );
         })}
        </Tbody>
       );
  };

  export default TableBody;

