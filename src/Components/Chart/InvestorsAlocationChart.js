import React, { useEffect, useState } from 'react';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import ApexChart from 'react-apexcharts';
import { fromWei } from 'web3-utils';
import Card from '../Card/Card';

const InvestorsAllocationChart = ({ Data }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        series: [],
    });

    useEffect(() => {
        updateInvestorsData();
    }, []);

    const updateInvestorsData = () => {
        try {
            const parsedData = JSON.parse(Data);

            if (parsedData) {
                const filteredData = parsedData.filter((item) => Number(fromWei(String(item["shares"]))).toFixed(6) > 0);

                const labels = filteredData.map((item) => String(item["user"]).replace(String(item["user"]).substring(6, 36), "..."));
                const balance = filteredData.map((item) => Number(fromWei(String(item["shares"]))).toFixed(6));
              
                setChartData({
                    labels,
                    series: balance,
                });
            }
        } catch (error) {
            console.error("Error parsing JSON data:", error);

            setChartData({
                labels: [],
                series: [],
            });
        }

    };

    const allbtnBg = useColorModeValue("#1A202C", "#fff")
    return (
        <React.Fragment>
            {
                chartData.labels.length > 0 ?
                    (
                        <Card>
                            <Box >
                                <Heading mb={5} fontSize="xl" fontWeight="700" color={allbtnBg} textTransform="capitalize">Investors shares</Heading>
                                <ApexChart
                                    options={{
                                        labels: chartData.labels,
                                        legend: {
                                            show: true,
                                            position: 'bottom',
                                            labels: {
                                                colors: [ allbtnBg,allbtnBg],
                                            },
                                        },
                                    }}
                                    series={chartData.series}
                                    type="pie"
                                    height="220px"
                                />
                            </Box>
                        </Card>
                    ) : null
            }
        </React.Fragment>
    );
};

export default InvestorsAllocationChart;
