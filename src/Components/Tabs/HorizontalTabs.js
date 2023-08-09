import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function HorizontalTabs({ data }) {
    return (
        <Tabs>
            <TabList>
                {data.map((tab, index) => (
                    <Tab key={index}>{tab.label}</Tab>
                ))}
            </TabList>

            <TabPanels>
                {data.map((tab) => {
                    return <TabPanel p={4} key={tab.id}>
                        {<tab.content data={tab} />}
                    </TabPanel>
                })}
            </TabPanels>
        </Tabs>
    )
}

export default HorizontalTabs
