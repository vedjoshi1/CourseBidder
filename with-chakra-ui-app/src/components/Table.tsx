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
  import { useState } from 'react';

  import TableHead from './TableHead';
  import TableBody from './TableBody';
  import mock from "../mock.json";



  const TableParent: React.FC = () => {
    
    const [tableData, setTableData] = useState(mock);
    
    const columns = [
        {label: "Username", accessor: "full_name"},
        {label: "Hours Since Posted", accessor: "hours_since"},
        {label: "Asking Price", accessor: "asking_price"}
    ]

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
        const sorted = [...tableData].sort((a, b) => {
            return (
            a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
            }) * (sortOrder === "asc" ? 1 : -1)
            );
        });
        setTableData(sorted);
        }
        
    };

    return (
        <Table variant='simple'>
            <TableCaption> Current Listings for <strong> CS35L </strong> </TableCaption>
            <TableHead columns={columns} handleSorting={handleSorting} />
            <TableBody tableData={tableData} columns={columns} />
        </Table>
    )
    



}

  export default TableParent; 