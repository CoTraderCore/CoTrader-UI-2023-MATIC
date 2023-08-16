import React, { useEffect, useState } from "react";
import { Box, Flex, Text, useColorModeValue, } from "@chakra-ui/react";
import Card from "./Card";
import PieChart from "../Chart/PieChart";
// import { pieChartData, pieChartOptions } from "../../Variable/Chart.js";
// import { VSeparator } from "../separator/Separator";
import getFundData from "../../utils/getFundData";
import UserInfo from "../template/UserInfo";
import { EtherscanLink } from "../../config";

 const pieChartOptions = {
    labels: ["BUSD", "CAKE", "Empty"],
    colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
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
        colors: ["#7500ff", "#28d3ff",],
        // colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
    },
    tooltip: {
        enabled: true,
        theme: "dark",
    },
};

 const pieChartData = [92.4844,7.5156 ];


function PieCard(props) {
    const { ...rest } = props;
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const cardColor = useColorModeValue("white", "navy.700");
    const pieTextcolor = useColorModeValue("secondaryGray.900", "#CBC3E3");
    const headingColor = useColorModeValue("#1B2559", "#F4F7FE");
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );


    const address = "0x36BDe6F520613Ce99dAC0b255492c533Ca3Dd8e0"
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
                smartFundAddress: fund?.data?.result?.address || "",
                name: fund?.data?.result?.name,
                balance: JSON.parse(fund?.data?.result?.balance || "[]"),
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

    // helper for parse pool connectors data
    const parsePoolConnectors = (data) => {
        const poolConnectors = data.map((item) => item.symbol)
        return (
            <UserInfo info={`Pool tokens : ${poolConnectors}`} />
        )
    }


    return (
        <Box align='center' direction='column' w={{base:"100%",md:"40%"}} {...rest}>
            <Flex
                px={{ base: "0px", "2xl": "10px" }}
                justifyContent='space-between'
                alignItems='center'
                w='100%'
                mb='8px'>
                <Text color={headingColor} fontSize='md' fontWeight='700' mt='4px'>
                    ASSET ALLOCATION IN ETH VALUE
                </Text>
            </Flex>
            <PieChart
                h='100%'
                w='100%'
                chartData={pieChartData}
                chartOptions={pieChartOptions}
            />
            <Card
                bg={cardColor}
                flexDirection='row'
                boxShadow={cardShadow}
                w='100%'
                p='10px'
                px='10px'
                mx='auto'>
                <Flex direction={{ base: "row",sm:"row", md: "row" }} justifyContent={'center'} py='5px' me='10px'>
                    {
                        fundData.balance.slice().sort(function (a, b) {
                            return Number(b.percentInETH) - Number(a.percentInETH)
                        }).map((item, key) => {
                            if (item["percentInETH"] > 0) {
                                return (
                                    <Box align='center' >
                                        <Text
                                            px={{ base: "0",sm:"10px", md: "10px" }}
                                            py={{ base: "5px", md: "0" }}
                                            display={'flex'}
                                            textTransform={'uppercase'}
                                            gap={1}
                                            fontSize='xs'
                                            color={pieTextcolor}
                                            fontWeight='700'
                                            mb='5px'>
                                            <img src="/empty-token.webp" alt="" height="20px" width="20px" />
                                            {<a href={EtherscanLink + "token/" + item["address"]} target="_blank" rel="noopener noreferrer">{item["symbol"]}</a>}
                                            &nbsp;
                                            {
                                                item["tokensAdditionalData"].length > 0
                                                    ?
                                                    (
                                                        <>
                                                            {parsePoolConnectors(item["tokensAdditionalData"])}
                                                        </>
                                                    ) : null
                                            }
                                        </Text>

                                        <Text fontSize={{base:"md",md:"lg"}} color={textColor} fontWeight='700' py={{ base: "5px", md: "0" }} px={{ base: "0",sm:"10px", md: "10px" }}>
                                            {item["percentInETH"] > 0 ? Number(item["percentInETH"]).toFixed(4) : 0} %
                                        </Text>
                                    </Box>

                                )
                            }
                        })
                    }

                </Flex>
            </Card>
        </Box>
    );
}

export default PieCard;










// import React, { useState, useEffect } from 'react';
// import { ChakraProvider, CSSReset } from '@chakra-ui/react';
// import PieChart from '../../Variable/Chart';

// const PieCard = ({ AssetsData }) => {
//     const [data, setData] = useState({
//         labels: [],
//         datasets: [],
//     });

//     const [isMounted, setIsMounted] = useState(true);

//     useEffect(() => {
//         setTimeout(() => {
//             updateAssetsData();
//         }, 1000);

//         return () => {
//             setIsMounted(false);
//         };
//     }, []);

//     useEffect(() => {
//         if (AssetsData && isMounted) {
//             updateAssetsData();
//         }
//     }, [AssetsData]);

//     const updateAssetsData = () => {
//         if (AssetsData) {
//             const filterData = AssetsData.filter(item => parseFloat(item.assetValueInETHFromWei) > 0);

//             const labels = filterData.map(item => item.symbol);
//             const balance = filterData.map(item => item.assetValueInETHFromWei);

//             if (isMounted) {
//                 setData({
//                     labels,
//                     datasets: [
//                         {
//                             data: balance,
//                         },
//                     ],
//                 });
//             }
//         }
//     };

//     return (
//         <ChakraProvider>
//             <CSSReset />
//             {data.labels.length > 0 ? (
//                 <div>
//                     <h1>Asset allocation in BNB value</h1>
//                     <PieChart data={data} />
//                 </div>
//             ) : null}
//         </ChakraProvider>
//     );
// };

// export default PieCard;
