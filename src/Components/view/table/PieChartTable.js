import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, Box } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useGlobalFilter, usePagination, useSortBy, useTable, } from "react-table";

export default function PieChartTable(props) {
    const { columnsData, tableData } = props;
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, initialState, } = tableInstance;
    initialState.pageSize = 11;
    
    const headingColor = useColorModeValue("#1B2559", "#F4F7FE");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.500");
    const headerColor = useColorModeValue("#1B2559", "#1B2559");
    return (
        <Box
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' align='center'>
                <Text
                    color={headingColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'>
                    FUND VALANCE
                </Text>
            </Flex>
            <Table {...getTableProps()} variant='simple' color='gray.500' mt='24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    pe='10px'
                                    key={index}
                                    borderColor={borderColor}>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color={headerColor}>
                                        {column.render("Header")}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                    let data = "";
                                    if (cell.column.Header === "TOKEN") {
                                        data = (
                                            <Flex align='center'>
                                                <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                    {cell.value}
                                                </Text>
                                            </Flex>
                                        );
                                    } else if (cell.column.Header === "% FROM FUND") {
                                        data = (
                                            <Flex align='center'>
                                                <Text
                                                    me='10px'
                                                    color={textColor}
                                                    fontSize='sm'
                                                    fontWeight='700'>
                                                    {cell.value} %
                                                </Text>
                                            </Flex>
                                        );
                                    } else if (cell.column.Header === "VALUE IN BNB") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "BALANCE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: "14px" }}
                                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor='transparent'>
                                            {data}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Box>
    );
}
