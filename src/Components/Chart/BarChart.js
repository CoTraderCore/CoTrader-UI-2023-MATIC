import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@chakra-ui/react";

const chartData = [
    { x: 'BUSD', y: 10 },
    { x: 'CAKE', y: 30 },
    { x: 'BNB', y: 100},

    // Add more data points as needed
];

const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const BarChart = () => {
    const [colors, setColors] = useState([]);

    useEffect(() => {
        const newColors = chartData.map(() => generateRandomColor());
        setColors(newColors);
    }, []);

    const options = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: chartData.map(item => item.x),
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return Math.min(value, 100) + '%'; // Limit value to 100%
                },
            },
        },
        colors: colors,
    };

    const series = [
        {
            name: 'Data Series',
            data: chartData.map(item => item.y),
        },
    ];

    return (
        <Box p="4">
            <ReactApexChart options={options} series={series} type="bar" height={300} />
        </Box>
    );
};

export default BarChart;
