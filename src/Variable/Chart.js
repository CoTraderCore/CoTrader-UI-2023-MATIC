// import React, { useState, useEffect } from 'react';
// import { Box, useColorModeValue, Flex, Text,useBreakpointValue } from '@chakra-ui/react';
// import Card from '../Components/Card/Card';
// import Chart from 'react-apexcharts';
// import getFundData from '../utils/getFundData';
// import UserInfo from '../Components/template/UserInfo';
// import { EtherscanLink } from '../config';

// const PieChart = () => {
//     const textColor = useColorModeValue("#000","#000");
//     const cardColor = useColorModeValue("white", "navy.700");
//     const pieTextcolor = useColorModeValue("secondaryGray.900", "#1B2559");
//         const cardShadow = useColorModeValue(
//         "0px 18px 40px rgba(112, 144, 176, 0.12)",
//         "unset"
//     );

//     const address = "0x36BDe6F520613Ce99dAC0b255492c533Ca3Dd8e0"
//     const [fundData, setFundData] = useState({
//         smartFundAddress: '',
//         name: '',
//         balance: [],
//         owner: '',
//         profitInETH: '0',
//         profitInUSD: '0',
//         valueInETH: '0',
//         valueInUSD: '0',
//         managerTotalCut: '0',
//         managerRemainingCut: '0',
//         shares: [],
//         isDataLoad: false,
//         mainAsset: '',
//         tradeVerification: 0,
//         fundSizeType: 'light',
//         version: 0,
//         managerFee: 0
//     });
//     useEffect(() => {
//         const getInitialData = async () => {
//             const fund = await getFundData(address)
//             setFundData({
//                 smartFundAddress: fund?.data?.result?.address || "",
//                 name: fund?.data?.result?.name,
//                 balance: JSON.parse(fund?.data?.result?.balance || "[]"),
//                 owner: fund?.data?.result?.owner,
//                 profitInETH: fund?.data?.result?.profitInETH,
//                 profitInUSD: fund?.data?.result?.profitInUSD,
//                 valueInETH: fund?.data?.result?.valueInETH,
//                 valueInUSD: fund?.data?.result?.valueInUSD,
//                 managerTotalCut: fund?.data?.result?.managerTotalCut,
//                 managerRemainingCut: fund?.data?.result?.managerRemainingCut,
//                 shares: fund?.data?.result?.shares,
//                 mainAsset: fund?.data?.result?.mainAsset,
//                 isDataLoad: true,
//                 tradeVerification: fund?.data?.result?.tradeVerification,
//                 fundSizeType: fund?.data?.result?.fundType || "",
//                 managerFee: fund?.data?.result?.managerFee,
//                 version: fund?.data?.result?.version
//             })

//         }
//         getInitialData()

//     }, [address])

//     // helper for parse pool connectors data
//     const parsePoolConnectors = (data) => {
//         const poolConnectors = data.map((item) => item.symbol)
//         return (
//             <UserInfo info={`Pool tokens : ${poolConnectors}`} />
//         )
//     }

//     const options = {
//         chart: {
//             type: 'pie',
//             background: 'transparent',
//         },
//         labels: data.labels,
//         colors: ["#6AD2FF", "#4318FF", "#EFF4FB"],
//         responsive: [
//             {
//                 breakpoint: 480,
//                 options: {
//                     chart: {
//                         width: useBreakpointValue({ base: 300, sm: 300,md:300 }),
//                     },
//                     legend: {
//                         position: 'top',
//                     },
//                 },
//             },
//         ],
//         plotOptions: {
//             pie: {
//                 dataLabels: {
//                     offset: 0,
//                 },
//             },
//         },
//     };


//     const series = data.datasets.map(dataset => dataset.value);

//     return (
//         <Box textAlign="center" p="4" sx={{display:"flex",justifyContent:"center"}}>
//             <Card
//                 bg={cardColor}
//                 flexDirection='row'
//                 boxShadow={cardShadow}
//                 w='100%'
//                 p='15px'
//                 px='20px'
//                 mt='15px'
//                 mx='auto'>
//                 <Box >
//                 <Chart options={options} series={series} type="pie" width="300" />
//                 </Box>


//                 <Flex direction={{ base: "column", md: "row" }} py='5px' me='10px' >
//                     {
//                         fundData.balance.slice().sort(function (a, b) {
//                             return Number(b.percentInETH) - Number(a.percentInETH)
//                         }).map((item, key) => {
//                             if (item["percentInETH"] > 0) {
//                                 return (

//                                     <Box align='center' key={key} >

//                                         <Text
//                                             px={{ base: "0", md: "10px" }}
//                                             py={{ base: "5px", md: "0" }}
//                                             display={'flex'}
//                                             gap={1}
//                                             fontSize='xs'
//                                             color={pieTextcolor}
//                                             fontWeight='700'
//                                             mb='5px'>
//                                             <img src="/empty-token.webp" alt="" height="20px" width="20px" />
//                                             {<a href={EtherscanLink + "token/" + item["address"]} target="_blank" rel="noopener noreferrer">{item["symbol"]}</a>}
//                                             &nbsp;
//                                             {
//                                                 item["tokensAdditionalData"].length > 0
//                                                     ?
//                                                     (
//                                                         <>
//                                                             {parsePoolConnectors(item["tokensAdditionalData"])}
//                                                         </>
//                                                     ) : null
//                                             }
//                                         </Text>

//                                         <Text fontSize='lg' color={textColor} fontWeight='700' py={{ base: "5px", md: "0" }} px={{ base: "0", md: "10px" }}>

//                                             {item["percentInETH"] > 0 ? Number(item["percentInETH"]).toFixed(4) : 0} %
//                                         </Text>
//                                     </Box>

//                                 )
//                             }
//                         })
//                     }

//                 </Flex>
//             </Card>
//         </Box>
//     );
// };

// export default PieChart;






export const barChartDataDailyTraffic = [
    {
        name: "Daily Traffic",
        data: [20, 30, 40, 20, 45, 50, 30],
    },
];

export const barChartOptionsDailyTraffic = {
    chart: {
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        style: {
            fontSize: "12px",
            fontFamily: undefined,
        },
        onDatasetHover: {
            style: {
                fontSize: "12px",
                fontFamily: undefined,
            },
        },
        theme: "dark",
    },
    xaxis: {
        categories: ["00", "04", "08", "12", "14", "16", "18"],
        show: false,
        labels: {
            show: true,
            style: {
                colors: "#A3AED0",
                fontSize: "14px",
                fontWeight: "500",
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
        color: "black",
        labels: {
            show: true,
            style: {
                colors: "#CBD5E0",
                fontSize: "14px",
            },
        },
    },
    grid: {
        show: false,
        strokeDashArray: 5,
        yaxis: {
            lines: {
                show: true,
            },
        },
        xaxis: {
            lines: {
                show: false,
            },
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            type: "vertical",
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
                [
                    {
                        offset: 0,
                        color: "#4318FF",
                        opacity: 1,
                    },
                    {
                        offset: 100,
                        color: "rgba(67, 24, 255, 1)",
                        opacity: 0.28,
                    },
                ],
            ],
        },
    },
    dataLabels: {
        enabled: false,
    },
    plotOptions: {
        bar: {
            borderRadius: 10,
            columnWidth: "40px",
        },
    },
};

// Consumption Users Reports

export const barChartDataConsumption = [
    {
        name: "PRODUCT A",
        data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    },
    {
        name: "PRODUCT B",
        data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    },
    {
        name: "PRODUCT C",
        data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    },
];

export const barChartOptionsConsumption = {
    chart: {
        stacked: true,
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        style: {
            fontSize: "12px",
            fontFamily: undefined,
        },
        onDatasetHover: {
            style: {
                fontSize: "12px",
                fontFamily: undefined,
            },
        },
        theme: "dark",
    },
    xaxis: {
        categories: ["17", "18", "19", "20", "21", "22", "23", "24", "25"],
        show: false,
        labels: {
            show: true,
            style: {
                colors: "#A3AED0",
                fontSize: "14px",
                fontWeight: "500",
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
        color: "black",
        labels: {
            show: false,
            style: {
                colors: "#A3AED0",
                fontSize: "14px",
                fontWeight: "500",
            },
        },
    },

    grid: {
        borderColor: "rgba(163, 174, 208, 0.3)",
        show: true,
        yaxis: {
            lines: {
                show: false,
                opacity: 0.5,
            },
        },
        row: {
            opacity: 0.5,
        },
        xaxis: {
            lines: {
                show: false,
            },
        },
    },
    fill: {
        type: "solid",
        colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    },
    legend: {
        show: false,
    },
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    dataLabels: {
        enabled: false,
    },
    plotOptions: {
        bar: {
            borderRadius: 10,
            columnWidth: "20px",
        },
    },
};


export const pieChartOptions = {
    labels: ["BUSD", "CAKE", "Empty"],
    colors: ["#984cf1", "#28d3ff",],
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
        colors: ["#984cf1", "#28d3ff",],
    },
    tooltip: {
        enabled: true,
        theme: "dark",
    },
};

export const pieChartData = [92.4844, 7.5156];

// Total Spent Default

export const lineChartDataTotalSpent = [
    {
        name: "Revenue",
        data: [50, 64, 48, 66, 49, 68],
    },
    {
        name: "Profit",
        data: [30, 40, 24, 46, 20, 46],
    },
];

export const lineChartOptionsTotalSpent = {
    chart: {
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            top: 13,
            left: 0,
            blur: 10,
            opacity: 0.1,
            color: "#4318FF",
        },
    },
    colors: ["#4318FF", "#39B8FF"],
    markers: {
        size: 0,
        colors: "white",
        strokeColors: "#7551FF",
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
    },
    tooltip: {
        theme: "dark",
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        type: "line",
    },
    xaxis: {
        type: "numeric",
        categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB",],
        labels: {
            style: {
                colors: "#A3AED0",
                fontSize: "12px",
                fontWeight: "500",
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    legend: {
        show: false,
    },
    grid: {
        show: false,
        column: {
            color: ["#7551FF", "#39B8FF"],
            opacity: 0.5,
        },
    },
    color: ["#7551FF", "#39B8FF"],
};
