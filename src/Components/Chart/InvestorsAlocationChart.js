import React, { useState, useEffect } from 'react';
import { Box, Heading,useColorModeValue } from '@chakra-ui/react';
import { fromWei } from 'web3-utils';
import ReactApexChart from 'react-apexcharts';
import Card from '../Card/Card';

function InvestorsAlocationChart(props) {
    const [chartData, setChartData] = useState({
        options: {
            labels: [],
            colors: ["#984cf1", "#7500FF", "#00E396", "#FF4560", "#775DD0"],
            dataLabels: {
                enabled: false, 
            },
        },
        series: [],
    });

    useEffect(() => {
        let isMounted = true;

        const updateInvestorsData = async () => {
            const Data = props.Data;

            if (Data) {
                try {
                    const parsedData = JSON.parse(Data);

                    if (Array.isArray(parsedData)) {
                        const filteredData = parsedData.filter(item => Number(fromWei(String(item["shares"]))).toFixed(6) > 0);

                        let labels = filteredData.map(item => {
                            return String(item["user"]).replace(String(item["user"]).substring(6, 36), "...");
                        });

                        let balance = filteredData.map(item => {
                            return Number(fromWei(String(item["shares"]))).toFixed(6);
                        });

                        if (isMounted) {
                            setChartData({
                                options: {
                                    labels: labels,
                                    dataLabels: {
                                        enabled: false,
                                    },
                                },
                                series: balance,
                            });
                        }
                    } else {
                        console.error("Invalid JSON data format. Expected an array.");
                    }
                } catch (error) {
                    console.error("Error parsing JSON data:", error);
                }
            } else {
                console.error("Data is empty.");
            }
        };

        setTimeout(async () => {
            await updateInvestorsData();
        }, 1000);

        return () => {
            isMounted = false;
        };
    }, [props.Data]);

    const allbtnBg = useColorModeValue("#1A202C", "#fff")
    return (
        <React.Fragment>
        {chartData.labels && chartData.labels.length > 0 ? (
                <Card>
                <Box>
                    <Heading mb={5} fontSize="xl" fontWeight="700" color={allbtnBg} textTransform="capitalize">Investors shares</Heading>
                    <ReactApexChart options={chartData.options} series={chartData.series} type="pie" height="220" />
                </Box>
            </Card>
            ):null
        }
           

        </React.Fragment>
    );
}

export default InvestorsAlocationChart;
