import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue, Tooltip, Box } from '@chakra-ui/react'
import AllFundWithoutWeb3 from '../../Pages/AllFundWithoutWeb3'
import MyFund from '../../Pages/MyFund'
import MyInvestment from '../../Pages/MyInvestment'

export const FundWithoutWeb3Tabs = (props) => {
    const tabColor = useColorModeValue("#7500fe", "#7500ff")
    return (
        <Tabs width="100%" overflowX="hidden">
            <TabList>
                <Tab color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "10px", md: "16px" }} textTransform="uppercase">All Funds</Tab>
                {
                   props.web3 ? (
                        <Tab color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "10px", md: "16px" }} textTransform="uppercase">My Fund</Tab>
                    ) : (
                        <Tooltip label="Please connect to web3">
                            <Tab isDisabled color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "10px", md: "16px" }} textTransform="uppercase">My Fund</Tab>
                        </Tooltip>
                    )
                }
                {props.web3 ?
                    (
                        <Tab color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "10px", md: "16px" }} textTransform="uppercase">My Investment</Tab>
                    ) : (
                        <Tooltip label="Please connect to web3">
                            <Tab isDisabled color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "10px", md: "16px" }} textTransform="uppercase">My Investment</Tab>
                        </Tooltip>
                    )}
            </TabList>
            <TabPanels>
                <TabPanel>
                    <AllFundWithoutWeb3 {...props} />
                </TabPanel>
                <TabPanel>
                    <MyFund />
                </TabPanel>
                <TabPanel>
                    <MyInvestment />
                </TabPanel>
            </TabPanels>
        </Tabs >
    )
}

