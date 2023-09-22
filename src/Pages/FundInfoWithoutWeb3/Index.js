import React, { useEffect, useState } from 'react'
import ShadowBox from '../../Components/Cards/ShadowBox';
import IconBox from '../../Components/Icons/IconBox';
import Header from '../../Components/common/Header';
import DashboardHeader from '../../Components/common/DashboardHeader';
import { Box, Heading, Icon, SimpleGrid, Button, Tooltip, List, ListItem, Progress, Stack, useColorModeValue, GridItem, Grid } from '@chakra-ui/react'
import { MdAttachMoney, } from "react-icons/md";
import PieCard from '../../Components/Card/PieCard';
import PieChartTable from '../../Components/view/table/PieChartTable';
import Card from '../../Components/Card/Card';
import Footer from '../../Components/common/footer/Footer';
import getFundData from '../../utils/getFundData';
import { fromWei } from 'web3-utils';
import { EtherscanLink, NeworkID } from '../../config';
// import { NeworkID } from '../../config';
import EtherscanButton from '../../Components/actions/EtherscanButton';
import Loading from '../../Components/template/spiners/Loading';
import { useParams } from 'react-router-dom';
import { pieChartOptions } from '../../Variable/Chart';
import Web3Allert from '../../Components/Web3Off/Web3Alert';
import _ from 'lodash';
import InvestorsAllocationChart from '../../Components/Chart/InvestorsAlocationChart';
import AssetsAlocationChart from '../../Components/Chart/AssetsAlocationChart';

function ViewFundWithoutWeb3() {
    const { address } = useParams()
    const [fundData, setFundData] = useState({
        smartFundAddress: '',
        name: '',
        balance: [],
        owner: '',
        profitInETH: '0',
        profitInUSD: '0',
        valueInETH: '0',
        valueInUSD: '0',
        managerTotalCut: '0',
        managerRemainingCut: '0',
        shares: [],
        isDataLoad: false,
        mainAsset: '',
        tradeVerification: 0,
        fundSizeType: 'light',
        version: 0,
        managerFee: 0
    });
    useEffect(() => {
        const getInitialData = async () => {
            const fund = await getFundData(address)
            setFundData({
                smartFundAddress: fund?.data?.result?.address,
                name: fund?.data?.result?.name,
                balance: JSON.parse(fund?.data?.result?.balance),
                owner: fund?.data?.result?.owner,
                profitInETH: fund?.data?.result?.profitInETH,
                profitInUSD: fund?.data?.result?.profitInUSD,
                valueInETH: fund?.data?.result?.valueInETH,
                valueInUSD: fund?.data?.result?.valueInUSD,
                managerTotalCut: fund?.data?.result?.managerTotalCut,
                managerRemainingCut: fund?.data?.result?.managerRemainingCut,
                shares: fund?.data?.result?.shares,
                mainAsset: fund?.data?.result?.mainAsset,
                isDataLoad: true,
                tradeVerification: fund?.data?.result?.tradeVerification,
                fundSizeType: fund?.data?.result?.fundType || "",
                managerFee: fund?.data?.result?.managerFee,
                version: fund?.data?.result?.version
            })

        }
        getInitialData()

    }, [address])

    const brandColor = useColorModeValue("#422AFB", "##CBC3E3");
    const boxBg = useColorModeValue("#F4F7FE", "#110938");
    const tooltipBg = useColorModeValue("black", "#A4ADC7")
    const headingColor = useColorModeValue("#1B2559", "#F4F7FE");
    const totalprogressBg = useColorModeValue("green.100", "#CBC3E3")
    const colorSchemeGreen = useColorModeValue("green", "green")
    const colorSchemeRed = useColorModeValue("red", "red")
    const remainingprogressBg = useColorModeValue("red.100", "#CBC3E3")
    const allbtnBg = useColorModeValue("#30106b", "#7500FF")

    return (
        <React.Fragment>
            {
                fundData.isDataLoad ?
                    (
                        <Box px={4}>
                            <Header heading="Fund Info." />
                            <Grid gap={5} sx={{ textAlign: 'center', fontWeight: "500" }}>
                                <GridItem style={{ borderRadius: "5px", boxShadow: "1px 1px 1px 1px gray", border: "1px solid white" }} >
                                    <Web3Allert />
                                </GridItem>
                            </Grid>
                            <Box mt={4} sx={{ padding: "10px", borderRadius: "10px", }}>
                                <Heading textTransform={"uppercase"} fontSize={{ base: "2xl" }} color={headingColor} textAlign={'center'} p={2}>{fundData.name}</Heading>
                                <SimpleGrid
                                    width="100%"
                                    columns={{ base: 1, md: 3, lg: 5, }}
                                    gap='20px'
                                    mb='20px'>
                                    <ShadowBox
                                        name='Type'
                                        value={fundData.fundSizeType}
                                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                                    />
                                    <ShadowBox
                                        name='Core asset'
                                        value={fundData.mainAsset}
                                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                                    />
                                    <ShadowBox
                                        name='Version'
                                        value={String(fundData.version)}
                                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                                    />
                                    <ShadowBox
                                        name='Manager fee'
                                        value={Number(fundData.managerFee / 100).toFixed(2) + "%"}
                                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                                    />
                                    <ShadowBox
                                        name='Limit tokens'
                                        value={Number(fundData.tradeVerification) === 1 ? "enable" : "disabled"}
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
                                    value={fromWei(String(fundData.profitInETH), 'ether')}
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
                                    value={fromWei(String(fundData.profitInUSD), 'ether')}
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
                                    value={fromWei(String(fundData.valueInETH), 'ether')}
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
                                    value={fromWei(String(fundData.valueInUSD), 'ether')}
                                />
                            </SimpleGrid>
                            <Box>
                                <Heading fontSize={{ base: "xl", md: "2xl" }} sx={{ textAlign: "center", textTransform: "uppercase", color: { headingColor }, padding: "10px 0px" }}>Investor actions</Heading>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <Box justifyContent="center" gap={5} sx={{ display: "flex", flexDirection: { base: "column", sm: "column", md: "row" }, width: { base: "100%", md: "70%", lg: "70%" } }}>
                                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                                Deposit
                                            </Button>
                                        </Tooltip>
                                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                                Withdraw
                                            </Button>
                                        </Tooltip>
                                        <EtherscanButton address={fundData.smartFundAddress} />
                                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                                My profile
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Box>
                            <Box mt={5} borderRadius="20px">
                                        <SimpleGrid gap={2} columns={{ base: 1, md: 2 }}>
                                          
                                                    <GridItem>
                                                        <InvestorsAllocationChart Data={fundData.shares} />
                                                    </GridItem>
                                            
                                            {
                                                NeworkID === 2 && !_.isEmpty(fundData.balance) ?
                                                    (
                                                        <GridItem>
                                                            <AssetsAlocationChart AssetsData={fundData.balance} version={fundData.version} />
                                                        </GridItem>
                                                    ) : null
                                            }

                                        </SimpleGrid>

                                    </Box>
                            <Box>
                                <Box mt={5} gap={4} width={"100%"} sx={{ display: "flex", flexDirection: { base: "column", md: "row" }, }} >
                                    <Card width={{ base: "100%", md: "30%" }} bg={"rgba(128, 144, 255,.1)"}>
                                        <Heading fontSize={{ base: "xl", md: "2xl" }} sx={{ textAlign: "center", textTransform: "uppercase", color: { headingColor }, padding: "10px 0px" }}>MANAGER INFO</Heading>
                                        <List p={5} width={{ base: "100%", md: "100%" }} textAlign={'center'} borderRadius={"10px"}>
                                            <ListItem py={4}>
                                                <span style={{ color: { headingColor }, fontWeight: "600" }}> Total Cut: {fromWei(fundData.managerTotalCut, 'ether')}</span>
                                                <Stack spacing={5}>
                                                    <Progress bg={totalprogressBg} colorScheme={colorSchemeGreen} size='md' value={fromWei(fundData.managerTotalCut, 'ether')} sx={{ borderRadius: "20px" }} />
                                                </Stack>
                                            </ListItem>
                                            <ListItem py={4}>
                                                <span style={{ color: { headingColor }, fontWeight: "600" }}> Remaining Cut: {fromWei(fundData.managerRemainingCut, 'ether')}</span>
                                                <Stack spacing={5} >
                                                    <Progress bg={remainingprogressBg} colorScheme={colorSchemeRed} size='md' value={fromWei(fundData.managerRemainingCut, 'ether')} sx={{ borderRadius: "20px" }} />
                                                </Stack>
                                            </ListItem>
                                        </List>
                                    </Card>
                                    
                                    <Card width={{ base: "100%", md: "70%" }} >
                                        <Box sx={{ display: "flex", flexDirection: { base: "column", md: "row" } }}>
                                            <PieChartTable address={address} fundData={fundData} />
                                            <PieCard fundData={fundData} version={fundData.version} address={address}

                                                pieChartData={fundData.balance.map((item) => {
                                                    return Number(item.assetValueInETHFromWei)
                                                })}

                                                pieChartOptions={
                                                    {
                                                        ...pieChartOptions,
                                                        labels: fundData.balance.map((item) => {
                                                            return item.symbol
                                                        }),
                                                        colors: ["#984cf1", "#7500FF", "#00E396", "#FF4560", "#775DD0"],
                                                        chart: {
                                                            width: "50px",
                                                        },
                                                        states: {
                                                            hover: {
                                                                filter: {
                                                                    type: "none",
                                                                },
                                                            },
                                                        },
                                                        legend: {
                                                            show: false,
                                                        },
                                                        dataLabels: {
                                                            enabled: false,
                                                        },
                                                        hover: { mode: null },
                                                        plotOptions: {
                                                            donut: {
                                                                expandOnClick: false,
                                                                donut: {
                                                                    labels: {
                                                                        show: false,
                                                                    },
                                                                },
                                                            },
                                                        },
                                                        fill: {
                                                            colors: ["#984cf1", "#7500FF", "#00E396", "#FF4560", "#775DD0"],
                                                        },
                                                        tooltip: {
                                                            enabled: true,
                                                            theme: "dark",
                                                        },
                                                    }
                                                }
                                            />


                                        </Box>
                                    </Card>
                                </Box>
                            </Box>
                            <Box pt={5}>
                                <Heading fontSize={{ base: "xl", md: "2xl" }} sx={{ textAlign: "center", textTransform: "uppercase", color: { headingColor }, padding: "10px 0px" }}>Manager actions</Heading>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <Box justifyContent="center" gap={5} sx={{ display: "flex", flexDirection: { base: "column", sm: "column", md: "row" }, width: { base: "100%", md: "70%", lg: "70%" } }}>
                                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                                Exchange
                                            </Button>
                                        </Tooltip>
                                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                                Take Cut
                                            </Button>
                                        </Tooltip>
                                        <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                                White List
                                            </Button>
                                        </Tooltip>
                                        {
                                            fundData.mainAsset === "USD" ?
                                                (
                                                    <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                                                        <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                                            Stable Tokens
                                                        </Button>
                                                    </Tooltip>
                                                ) : null
                                        }
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Card mt={5}>
                                    <Grid sx={{ display: "flex", justifyContent: "space-around", }} flexDirection={{ base: "column", md: "row" }} gap={{ base: "20px", md: "0" }}>
                                        <GridItem fontWeight={600} >

                                            Smart Fund: <a style={{ color: "#5E39FF", fontWeight: "500", }} href={EtherscanLink + "address/" + fundData.smartFundAddress} target="_blank" rel="noopener noreferrer">{String(fundData.smartFundAddress).replace(String(fundData.smartFundAddress).substring(6, 36), "...")}</a>
                                        </GridItem>
                                        <GridItem fontWeight={600}>
                                            Owner: <a style={{ color: "#5E39FF", fontWeight: "500" }} href={EtherscanLink + "address/" + fundData.owner} target="_blank" rel="noopener noreferrer">{String(fundData.owner).replace(String(fundData.owner).substring(6, 36), "...")}</a>
                                        </GridItem>
                                    </Grid>
                                </Card>
                            </Box>
                            <Footer />
                        </Box>
                    ) :
                    (
                        <Loading />
                    )
            }

        </React.Fragment>
    )
}

export default ViewFundWithoutWeb3;
