import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue, Tooltip, Box } from '@chakra-ui/react'
import AllSmartFund from '../../Pages/AllSmartFund'
import MyFund from '../../Pages/MyFund'
import MyInvestment from '../../Pages/MyInvestment'
import { inject } from 'mobx-react'

 const SmartfundTabs = (props) => {

    const tabColor = useColorModeValue("#7500fe", "#7500ff")
    return (
        <React.Fragment>
            <Tabs width="100%" overflowX="hidden">
                <TabList>
                    <Tab color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "10px", md: "16px" }} textTransform="uppercase">All Funds</Tab>
                    {
                        props.MobXStorage.web3 ? (
                            <Tab color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "10px", md: "16px" }} textTransform="uppercase">My Fund</Tab>
                        ) : (
                            <Tooltip label="Please connect to web3">
                                <Tab isDisabled color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "10px", md: "16px" }} textTransform="uppercase">My Fund</Tab>
                            </Tooltip>
                        )
                    }
                    {props.MobXStorage.web3 ?
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
                        <AllSmartFund {...props} accounts={props.accounts} web3={props.web3} />
                    </TabPanel>
                    <TabPanel>
                        <MyFund />
                    </TabPanel>
                    <TabPanel>
                        <MyInvestment />
                    </TabPanel>
                </TabPanels>
            </Tabs >
        </React.Fragment>
    )
}
export default inject('MobXStorage')(SmartfundTabs)


