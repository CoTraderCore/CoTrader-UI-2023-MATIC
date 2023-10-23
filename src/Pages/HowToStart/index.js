import React from 'react'
import { Box, Card, CardBody, Heading, Image, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import Header from '../../Components/common/Header'

function HowToStart() {
 
    const cardBg=useColorModeValue("#fff","#181144")
    const stepColor=useColorModeValue("#1B2559","#fff")
    const textColor=useColorModeValue("#808080","#fff")
    return (
        <Box>
        <Header heading="How to start"/>
        <SimpleGrid columns={[1,null,2]} gap={5}>
            <Card py={2} bg={cardBg} maxW="100%">
                <Heading color={stepColor} fontSize="2xl">Step 1</Heading>
                <CardBody>
                    <Image src="/img/cotrader-steps/1.png" alt="171x180" />
                </CardBody>
                <Text color={textColor} fontSize={{base:"12px",md:"14px"}}>Press button by name "Create new fund"</Text>
            </Card>
            <Card py={2} bg={cardBg} maxW="100%">
                <Heading color={stepColor} fontSize="2xl">Step 2</Heading>
                <CardBody>
                    <Image src="/img/cotrader-steps/2.png" alt="171x180" />
                </CardBody>
                <Text color={textColor} fontSize={{base:"12px",md:"14px"}}>Enter name of fund end performans fee. Performance fee is the % the fund manager earns for the profits earned, relative to ETH.</Text>
                <Text color={textColor} fontSize={{base:"12px",md:"14px"}}>In the near future, we will add an option for realitive to USD, or DAI.</Text>
            </Card>
            <Card py={2} bg={cardBg} maxW="100%">
                <Heading color={stepColor} fontSize="2xl">Step 3</Heading>
                <CardBody>
                    <Image src="/img/cotrader-steps/3.png" alt="171x180" />
                </CardBody>
                <Text color={textColor} fontSize={{base:"12px",md:"14px"}}>Confirm tx, and wait</Text>
            </Card>
            <Card py={2} bg={cardBg} maxW="100%">
                <Heading color={stepColor} fontSize="2xl">Step 4</Heading>
                <CardBody>
                    <Image src="/img/cotrader-steps/4.png" alt="171x180" />
                </CardBody>
                <Text color={textColor} fontSize={{base:"12px",md:"14px"}}>Find Your fund using buttons by name "My funds" or "Filter funds"</Text>
            </Card>
            <Card py={2} bg={cardBg} maxW="100%">
                <Heading color={stepColor} fontSize="2xl">Step 5</Heading>
                <CardBody>
                    <Image src="/img/cotrader-steps/5.png" alt="171x180" />
                </CardBody>
                <Text color={textColor} fontSize={{base:"12px",md:"14px"}}>Make deposit in Your fund</Text>
            </Card>
            <Card py={2} bg={cardBg} maxW="100%">
                <Heading color={stepColor} fontSize="2xl">Step 6</Heading>
                <CardBody>
                    <Image src="/img/cotrader-steps/6.png" alt="171x180" />
                </CardBody>
                <Text color={textColor} fontSize={{base:"12px",md:"14px"}}>Confirm tx</Text>
            </Card>
            <Card py={2} bg={cardBg} maxW="100%">
                <Heading color={stepColor} fontSize="2xl">Step 7</Heading>
                <CardBody>
                    <Image src="/img/cotrader-steps/7.png" alt="171x180" />
                </CardBody>
                <Text color={textColor} fontSize={{base:"12px",md:"14px"}}>Press button by name "More" to get more fund options, and then press button by name "Exchange"</Text>
            </Card>
            <Card py={2} bg={cardBg} maxW="100%">
                <Heading color={stepColor} fontSize="2xl">Step 8</Heading>
                <CardBody>
                    <Image src="/img/cotrader-steps/8.png" alt="171x180" />
                </CardBody>
                <Text color={textColor} fontSize={{base:"12px",md:"14px"}}>Select token pair</Text>
            </Card>
            <Card py={2} bg={cardBg} maxW="100%">
                <Heading color={stepColor} fontSize="2xl">Step 9</Heading>
                <CardBody>
                    <Image src="/img/cotrader-steps/9.png" alt="171x180" />
                </CardBody>
                <Text color={textColor} fontSize={{base:"12px",md:"14px"}}>Select amount</Text>
            </Card>
            <Card py={2} bg={cardBg} maxW="100%">
                <Heading color={stepColor} fontSize="2xl">Step 10</Heading>
                <CardBody>
                    <Image src="/img/cotrader-steps/10.png" alt="171x180" />
                </CardBody>
                <Text color={textColor} fontSize={{base:"12px",md:"14px"}}>Confirm tx</Text>
            </Card>
            <Card py={2} bg={cardBg} maxW="100%">
                <Heading color={stepColor} fontSize="2xl">Step 11</Heading>
                <CardBody>
                    <Image src="/img/cotrader-steps/11.png" alt="171x180" />
                </CardBody>
                <Text color={textColor} fontSize={{base:"12px",md:"14px"}}>Congratulations on your first trade with CoTrader</Text>
            </Card>
        </SimpleGrid>
        </Box>
    )
}

export default HowToStart
