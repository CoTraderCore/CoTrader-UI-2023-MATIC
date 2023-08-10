import React from 'react'
import ShadowBox from '../../Components/Cards/ShadowBox'
import IconBox from '../../Components/Icons/IconBox';
import Header from '../../Components/common/Header';
// import DashboardHeader from '../../Components/common/DashboardHeader';
import { Box, Heading, Icon, SimpleGrid, useColorModeValue, Button, Tooltip, } from '@chakra-ui/react'
import { MdAttachMoney, } from "react-icons/md";
import PieCard from '../../Components/Card/PieCard';
import PieChartTable from '../../Components/view/table/PieChartTable';
import Card from '../../Components/Card/Card';
// import {columnsDataCheck} from '../../Components/view/default/columnDataCheck'
// import {tableDataCheck} from '../../Components/view/default/tableDataCheck.json'
import { pieChartData, } from "../../Variable/Chart.js";
import ManagerInfo from '../../Components/view/default/progress/managerInfo';
import Footer from '../../Components/view/footer/Footer';

const BUSD = pieChartData[0]
const CAKE = pieChartData[1]
const tableDataCheck = [{
    "token": "BUSD",
    "% from fund": BUSD,
    "value in bnb": 9.396720,
    "balance": 2289.8938
},
{
    "token": "CAKE",
    "% from fund": CAKE,
    "value in bnb": 0.763615,
    "balance": 125.2259
},

]
const columnsDataCheck = [
    {
        Header: "TOKEN",
        accessor: "token",
    },
    {
        Header: "% FROM FUND",
        accessor: "% from fund",
    },
    {
        Header: "VALUE IN BNB",
        accessor: "value in bnb",
    },
    {
        Header: "BALANCE",
        accessor: "balance",
    },
];
function About() {
    const brandColor = useColorModeValue("#422AFB", "#422AFB");
    const boxBg = useColorModeValue("#F4F7FE", "#F4F7FE");
    const headingColor = useColorModeValue("#1B2559", "#F4F7FE");
    const tooltipBg = useColorModeValue("black", "#A4ADC7")

    return (
        <Box p={4} background="" >
            <Header heading="All Funds" />
            {  /*  <DashboardHeader />*/}
            <Box mt={4} sx={{ backgroundColor: "rgba(128, 144, 255,.1)", padding: "10px", borderRadius: "10px", }}>
                <Heading fontSize={{ base: "2xl" }} color={headingColor} textAlign={'center'} p={2}>CAKE BUSD TVL ALGO FUND</Heading>
                <SimpleGrid
                    width="100%"
                    columns={{ base: 1, md: 3, lg: 5, }}
                    gap='20px'
                    mb='20px'>
                    <ShadowBox
                        name='Type'
                        value='Full'
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                    <ShadowBox
                        name='Core asset'
                        value='USD'
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                    <ShadowBox
                        name='Version'
                        value='9'
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                    <ShadowBox
                        name='Manager fee'
                        value='20.00 %'
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                    <ShadowBox
                        name='Limit tokens'
                        value='Disabled'
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                </SimpleGrid>
            </Box>
            <SimpleGrid
                pt={5}
                width="100%"
                columns={{ base: 1, md: 2, lg: 4, }}
                gap='20px'
                mb='20px'>
                <ShadowBox
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                            }
                        />
                    }
                    name='Fund profit in BNB'
                    value='0'
                />
                <ShadowBox
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                            }
                        />
                    }
                    name='Fund profit in USD'
                    value='-3311.668807278791188861'
                />
                <ShadowBox
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={<Icon w='28px' h='28px' as={MdAttachMoney} color={brandColor} />}
                        />
                    }
                    name='Fund value in BNB'
                    value='2.497283838364956056'
                />
                <ShadowBox
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={<Icon w='28px' h='28px' as={MdAttachMoney} color={brandColor} />}
                        />
                    }
                    name='Fund value in USD'
                    value='980.081614927585048556'
                />
            </SimpleGrid>
            <Box>
                <Heading fontSize={{ base: "xl", md: "2xl" }} sx={{ textAlign: "center", textTransform: "uppercase", color: { headingColor }, padding: "10px 0px" }}>Investor actions</Heading>
                <Box  sx={{ display: "flex", justifyContent: "center" }}>
                    <Box justifyContent="center" gap={5} sx={{ display: "flex", flexDirection: { base: "column", sm: "column", md: "row" }, width: { base: "100%", md: "70%", lg: "70%" } }}>
                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#4318ff" color="#fff" sx={{ _hover: { backgroundColor: "#4318ffcc" } }}>
                                Deposit
                            </Button>
                        </Tooltip>
                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#4318ff" color="#fff" sx={{ _hover: { backgroundColor: "#4318ffcc" } }}>
                                Withdraw
                            </Button>
                        </Tooltip>
                        <Tooltip hasArrow label="" bg={tooltipBg}>
                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#4318ff" color="#fff" sx={{ _hover: { backgroundColor: "#4318ffcc" } }}>
                                Scan
                            </Button>
                        </Tooltip>
                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#4318ff" color="#fff" sx={{ _hover: { backgroundColor: "#4318ffcc" } }}>
                                My profile
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
                </Box>
                <Box>
                    <Box mt={5} gap={4} width={"100%"} sx={{ display: "flex", flexDirection: { base: "column", sm: "column", md: "row" }, }} >
                        <ManagerInfo />
                        <Card width={{ base: "100%", md: "70%" }} >
                            <Box sx={{ display: "flex", flexDirection: { base: "column", md: "row" } }}>
                                <PieChartTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
                                <PieCard />
                            </Box>
                        </Card>
                    </Box>
                </Box>
                <Box pt={5}>
                <Heading fontSize={{ base: "xl", md: "2xl" }} sx={{ textAlign: "center", textTransform: "uppercase", color: { headingColor }, padding: "10px 0px" }}>Manager actions</Heading>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box justifyContent="center" gap={5} sx={{ display: "flex", flexDirection: { base: "column", sm: "column", md: "row" }, width: { base: "100%", md: "70%", lg: "70%" } }}>
                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#4318ff" color="#fff" sx={{ _hover: { backgroundColor: "#4318ffcc" } }}>
                                Exchange
                            </Button>
                        </Tooltip>
                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#4318ff" color="#fff" sx={{ _hover: { backgroundColor: "#4318ffcc" } }}>
                                Pool
                            </Button>
                        </Tooltip>
                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#4318ff" color="#fff" sx={{ _hover: { backgroundColor: "#4318ffcc" } }}>
                                Take Cut
                            </Button>
                        </Tooltip>
                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#4318ff" color="#fff" sx={{ _hover: { backgroundColor: "#4318ffcc" } }}>
                                White List 
                            </Button>
                        </Tooltip>
                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#4318ff" color="#fff" sx={{ _hover: { backgroundColor: "#4318ffcc" } }}>
                                Stable Tokens
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
                </Box>
                <Footer/>
            </Box>
    )
}

export default About
