import React, { useEffect, useState } from 'react';
import { Heading, Box, useColorModeValue } from '@chakra-ui/react';
import ApexChart from 'react-apexcharts';
import Card from '../Card/Card';
import MobXStorage from '../../MobXStorage';

const AssetsAlocationChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        dataLabels: {
            enabled: false
        },
        colors: ["#984cf1", "#7500FF", "#00E396", "#FF4560", "#775DD0"],
        series: [],
    });

    // const eth_token = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

    useEffect(() => {
        updateAssetsData();
    }, [MobXStorage.AssetsData]);

    const updateAssetsData = () => {
        const AssetsData = MobXStorage.AssetsData;

        if (AssetsData) {
            const filterData = AssetsData.filter((item) => parseFloat(item.assetValueInETHFromWei) > 0);

            const labels = filterData.map((item) => {
                return item.symbol;
            });

            const series = filterData.map((item) => item.assetValueInETHFromWei);

            setChartData({
                labels,
                dataLabels: {
                    enabled: false,
                },
                series,
            });
        }
    };
    const allbtnBg = useColorModeValue("#1A202C", "#fff")
    return (
        <React.Fragment>
            {
            chartData.labels && chartData.labels.length > 0 ? (
                        <Card>
                            <Box>
                                <Heading mb={5} fontSize="xl" fontWeight="700" color={allbtnBg} textTransform="capitalize">Asset allocation in BNB value</Heading>
                                <ApexChart
                                    options={{
                                        labels: chartData.labels,
                                        dataLabels: {
                                            enabled: chartData.dataLabels.enabled,
                                        },
                                    }}
                                    series={chartData.series}
                                    type="pie"
                                    height="220"
                                />
                            </Box>
                        </Card>
                    ) : null
            }

        </React.Fragment>
    );
};

export default AssetsAlocationChart;
