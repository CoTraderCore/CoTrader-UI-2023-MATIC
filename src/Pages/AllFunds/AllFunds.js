import React from 'react'
import ShadowBox from '../../Components/Cards/ShadowBox'
import { Box, SimpleGrid, Heading, useColorModeValue, Tooltip, Button } from '@chakra-ui/react'
import IconBox from '../../Components/Icons/IconBox';
import { Icon } from '@chakra-ui/react';
import { MdAttachMoney } from 'react-icons/md'
import Card from '../../Components/Card/Card';
import BarChart from '../../Components/Chart/BarChart';
import { Link } from 'react-router-dom';
import DailyTraffic from '../../Components/Chart/DailyTrafic';
import TotalSpent from '../../Variable/TotalSpent';
import FundModal from '../../Components/actions/FundModal';
import ManagerModal from '../../Components/actions/ManagerModal';



function AllFunds() {
    const headingColor = useColorModeValue("#1B2559", "#F4F7FE");
    const brandColor = useColorModeValue("#422AFB", "##CBC3E3");
    const boxBg = useColorModeValue("#F4F7FE", "#110938");
    const tooltipBg = useColorModeValue("black", "#A4ADC7")

    return (
        <React.Fragment>
            <Box mt={4} sx={{ borderRadius: "10px", }}>
                <Heading textTransform={"uppercase"} fontSize={{ base: "2xl" }} color={headingColor} textAlign={'center'} p={2}>CAKE BUSD TVL ALGO FUND</Heading>
                <SimpleGrid
                    width="100%"
                    columns={{ base: 1, md: 3, lg: 4, }}
                    gap='20px'
                    mb='20px'>
                    <ShadowBox
                        name='Type'
                        value="full"
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                    <ShadowBox
                        name='Core asset'
                        value="USD"
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                    <ShadowBox
                        name='Version'
                        value="9"
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                    <ShadowBox
                        name='Manager fee'
                        value="20%"
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                    <ShadowBox
                        name='Total Assets'
                        value="3"
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                    <ShadowBox
                        name='Active Assets'
                        value="2"
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                    <ShadowBox
                        name='Investors'
                        value="0"
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                    <ShadowBox
                        name='Trade Varification'
                        value="disabled"
                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                    />
                </SimpleGrid>
            </Box>
            <Card>
                <SimpleGrid gap='20px'
                    mb='20px'
                    columns={{ base: 1, md: 2, lg: 2, }}
                    sx={{ width: "100%", }} >
                    <BarChart />
                    <DailyTraffic />
                    <TotalSpent />
                </SimpleGrid>
            </Card>
            <SimpleGrid mt={5} gap={5}  columns={{base:1,md:2}}>
                <Card textAlign="center">
                    <FundModal />
                </Card>
                <Card textAlign="center">
                    <ManagerModal />
                </Card>
            </SimpleGrid>


            <Box mt={4} display="flex" justifyContent="center">
                <Box justifyContent="center" gap={5} sx={{ display: "flex", flexDirection: { base: "column", sm: "column", md: "row" }, width: { base: "100%", md: "70%", lg: "70%" } }}>
                    <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                        <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#5E39FF" color="#fff" sx={{ _hover: { backgroundColor: "#7500ff" } }}>
                            Deposit
                        </Button>
                    </Tooltip>
                    <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                        <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#5E39FF" color="#fff" sx={{ _hover: { backgroundColor: "#7500ff" } }}>
                            Withdraw
                        </Button>
                    </Tooltip>
                    <Tooltip hasArrow label="" bg={tooltipBg}>
                        <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#5E39FF" color="#fff" sx={{ _hover: { backgroundColor: "#7500ff" } }}>
                            <Link to={"/web3off/fund/"} style={{ width: "100%",color:"white" }}>
                                Fund Page
                            </Link>
                        </Button>
                    </Tooltip>
                    <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                        <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#5E39FF" color="#fff" sx={{ _hover: { backgroundColor: "#7500ff" } }}>
                            My Funds
                        </Button>
                    </Tooltip>
                    <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                        <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#5E39FF" color="#fff" sx={{ _hover: { backgroundColor: "#7500ff" } }}>
                            Scan
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
            <Box>
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
                        value=""
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
                        value=""
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
                        value=""
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
                        value=""
                    />
                </SimpleGrid>
            </Box>
        </React.Fragment>
    )
}

export default AllFunds
