import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue, Tooltip, Box, useStatStyles } from '@chakra-ui/react'
import AllSmartFund from '../../Pages/AllSmartFund'
// import MyFund from '../../Pages/MyFund'
// import MyInvestment from '../../Pages/MyInvestment'
import { Observer, inject } from 'mobx-react'


const SmartfundTabs = (props) => {
    const tabColor = useColorModeValue("#7500fe", "#7500ff")

    return (
        <Observer>
            {() => {
                return (
                    <React.Fragment>
                        <Tabs width="100%" overflowX="hidden" >
                            <TabList>
                                <Tab onClick={() => props.MobXStorage.AllFunds()} color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "14px", md: "16px" }} textTransform="uppercase">All Funds</Tab>
                                {
                                    props.MobXStorage.web3 ? (
                                        <Tab onClick={() => props.MobXStorage.myFunds(props.MobXStorage.account[0])} color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "14px", md: "16px" }} textTransform="uppercase">My Fund</Tab>
                                    ) : (
                                        <Tooltip label="Please connect to web3">
                                            <Tab isDisabled color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "14px", md: "16px" }} textTransform="uppercase">My Fund</Tab>
                                        </Tooltip>
                                    )
                                }
                                {props.MobXStorage.web3 ?
                                    (
                                        <Tab onClick={() => props.MobXStorage.myInvestments(props.MobXStorage.account[0])} color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "14px", md: "16px" }} textTransform="uppercase">My Investment</Tab>
                                    ) : (
                                        <Tooltip label="Please connect to web3">
                                            <Tab isDisabled color={tabColor} fontWeight={{ base: "400", md: "500" }} fontSize={{ base: "14px", md: "16px" }} textTransform="uppercase">My Investment</Tab>
                                        </Tooltip>
                                    )}

                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <AllSmartFund MobXStorage={props.MobXStorage} accounts={props.MobXStorage.account} web3={props.MobXStorage.web3} pending={props.pending} />
                                </TabPanel>
                                <TabPanel>
                                    <AllSmartFund MobXStorage={props.MobXStorage} accounts={props.MobXStorage.account} web3={props.MobXStorage.web3} pending={props.pending} />
                                </TabPanel>
                                <TabPanel>
                                    <AllSmartFund MobXStorage={props.MobXStorage} accounts={props.MobXStorage.account} web3={props.MobXStorage.web3} pending={props.pending} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs >
                    </React.Fragment>
                )
            }}
        </Observer>
    )
}
export default inject('MobXStorage')(SmartfundTabs)


