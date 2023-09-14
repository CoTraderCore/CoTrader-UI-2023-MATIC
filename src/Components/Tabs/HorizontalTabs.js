import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue, Tooltip, Box } from '@chakra-ui/react'

function HorizontalTabs({ data,pending,web3,accounts }) {
  
    const tabColor = useColorModeValue("#7500fe", "#7500ff")
    return (
        <Tabs width="100%" overflowX="hidden">
            <TabList>
                {data.map((tab, index) => (
                    <Tooltip
                    key={index}
                    label={web3 ? '' : 'Please connect to web3'}
                    aria-label="Tab Tooltip"
                    isDisabled={web3 ? tab.enable : !tab.disabled} // Enable the tooltip only for disabled tabs
                  >
                    <Tab color={tabColor} fontWeight={{base:"400",md:"500"}} fontSize={{base:"10px",md:"16px"}}   isDisabled={tab.disabled}  textTransform="uppercase" key={index}>{tab.label}</Tab>
                    </Tooltip>
                ))}
            </TabList>
            <TabPanels>
                {data.map((tab) => {
                    return <TabPanel p={1} key={tab.id}>
                        {<tab.content data={tab} pending={pending} web3={web3} accounts={accounts} />}
                    </TabPanel>
                })}
            </TabPanels>
        </Tabs>
    )
}

export default HorizontalTabs

