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

  import {ArrowUpDownIcon} from "@chakra-ui/icons"
  import { useState } from 'react';

  interface columns {
    label: string;
    accessor: string;
  }

  interface MyTableProps {
    columns: columns[];
    handleSorting: (sortField: string, sortOrder: string) => void; 
  }

  const TableHead : React.FC<MyTableProps> = ({columns, handleSorting}) => {
        const [sortField, setSortField] = useState("");
        const [order, setOrder] = useState("asc");

        const handleSortingChange = (accessor) => {
            const sortOrder =
             accessor === sortField && order === "asc" ? "desc" : "asc";
            setSortField(accessor);
            setOrder(sortOrder);
            handleSorting(accessor, sortOrder);
        };

        return (
            <Thead width="100%">
                <Tr>
                    {columns.map(( {label, accessor } ) => {
                        return <Th key={accessor} onClick={() => handleSortingChange(accessor)}>
                                    {label} <ArrowUpDownIcon />
                                </Th>;
                    })}
                </Tr>

            </Thead>
        );
  }

  export default TableHead; 