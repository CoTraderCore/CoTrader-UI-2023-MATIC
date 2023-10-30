import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue, Tooltip, Box } from '@chakra-ui/react'
import AllFundWithoutWeb3 from '../../Pages/AllFundWithoutWeb3'
import { inject,observer } from 'mobx-react'

const FundWithoutWeb3Tabs = (props) => {
    const tabColor = useColorModeValue("#039be5", "#00D8CF")
    return (
        <React.Fragment>
                    <Tabs width="100%" overflowX="hidden">
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
                                <AllFundWithoutWeb3 {...props} />
                            </TabPanel>
                            <TabPanel>
                                <AllFundWithoutWeb3 {...props} />
                            </TabPanel>
                            <TabPanel>
                                <AllFundWithoutWeb3 {...props} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs >
                    </React.Fragment>
    )
};
export default inject('MobXStorage')(observer(FundWithoutWeb3Tabs))
