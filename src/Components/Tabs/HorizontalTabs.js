import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue, Tooltip } from '@chakra-ui/react'
import MobXStorage from '../../MobXStorage'


function HorizontalTabs({ data,pending }) {
  
    const tabColor = useColorModeValue("#7500fe", "#7500ff")
    return (
        <Tabs>
            <TabList>
                {data.map((tab, index) => (
                    <Tooltip
                    key={index}
                    label={MobXStorage.web3 ? '' : 'Please connect to web3'}
                    aria-label="Tab Tooltip"
                    isDisabled={MobXStorage.web3 ? tab.enable : !tab.disabled} // Enable the tooltip only for disabled tabs
                  >
                    <Tab color={tabColor} fontWeight={500}  isDisabled={tab.disabled}  textTransform="uppercase" key={index}>{tab.label}</Tab>
                    </Tooltip>
                ))}
            </TabList>
            <TabPanels>
                {data.map((tab) => {
                    return <TabPanel p={1} key={tab.id}>
                        {<tab.content data={tab} pending={pending} />}
                    </TabPanel>
                })}
            </TabPanels>
        </Tabs>
    )
}

export default HorizontalTabs

