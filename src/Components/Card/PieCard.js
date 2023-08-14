import React from "react";
import { Box, Flex, Text, useColorModeValue, } from "@chakra-ui/react";
import Card from "./Card";
import PieChart from "../Chart/PieChart";
import { pieChartData, pieChartOptions } from "../../Variable/Chart.js";
import { VSeparator } from "../separator/Separator";

function PieCard(props) {
    const { ...rest } = props;
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const cardColor = useColorModeValue("white", "navy.700");
    const pieTextcolor = useColorModeValue("secondaryGray.900", "#1B2559");
    const headingColor = useColorModeValue("#1B2559", "#F4F7FE");
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );
    const BUSD = pieChartData[0]
    const CAKE = pieChartData[1]

    return (
        <Box align='center' direction='column' w='100%' {...rest}>
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
                p='15px'
                px='20px'
                mt='15px'
                mx='auto'>
                <Flex direction='column' py='5px' me='10px'>
                    <Flex align='center'>
                        <Box h='10px' w='10px' bg='#4318ff' borderRadius='50%' me='4px' />
                        <Text
                            display={'flex'}
                            gap={1}
                            fontSize='xs'
                            color={pieTextcolor}
                            fontWeight='700'
                            mb='5px'>
                            <img src="/empty-token.webp" alt="" height="20px" width="20px" />
                            BUSD
                        </Text>
                    </Flex>
                    <Text fontSize='lg' color={textColor} fontWeight='700'>
                        {BUSD} %
                    </Text>
                </Flex>
                <VSeparator mx={{ base: "60px", xl: "60px", "2xl": "60px" }} />
                <Flex direction='column' py='5px' me='10px'>
                    <Flex align='center'>
                        <Box h='10px' w='10px' bg='#6AD2FF' borderRadius='50%' me='4px' />
                        <Text
                            display={'flex'}
                            gap={1}
                            fontSize='xs'
                            color={pieTextcolor}
                            fontWeight='700'
                            mb='5px'>
                            <img src="/empty-token.webp" alt="" height="20px" width="20px" />
                            CAKE
                        </Text>
                    </Flex>
                    <Text fontSize='lg' color={textColor} fontWeight='700'>
                        {CAKE}%
                    </Text>
                </Flex>
            </Card>
        </Box>
    );
}

export default PieCard;
