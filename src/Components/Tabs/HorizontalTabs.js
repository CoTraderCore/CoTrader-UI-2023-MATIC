import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue } from '@chakra-ui/react'

function HorizontalTabs({ data }) {
    const tabColor=useColorModeValue( "#7500fe","#7500ff")
    return (
        <Tabs>
            <TabList>
                {data.map((tab, index) => (
                    <Tab color={tabColor} key={index}>{tab.label}</Tab>
                ))}
            </TabList>

            <TabPanels>
                {data.map((tab) => {
                    return <TabPanel p={1} key={tab.id}>
                        {<tab.content data={tab} />}
                    </TabPanel>
                })}
            </TabPanels>
        </Tabs>
    )
}

export default HorizontalTabs
