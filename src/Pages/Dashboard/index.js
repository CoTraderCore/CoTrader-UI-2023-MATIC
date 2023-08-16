import React from 'react'
import { Box, Grid, GridItem, Stack, Icon, useColorModeValue, SimpleGrid,Button } from '@chakra-ui/react';
import DashboardHeader from '../../Components/common/DashboardHeader'
import Header from '../../Components/common/Header';
import FilterSearch from '../../Components/Filter&Search/FilterSearch';
import CreateFundButton from '../../Components/template/CreateFundButton';
import ShadowBox from '../../Components/Cards/ShadowBox';
import IconBox from '../../Components/Icons/IconBox';
import {MdAttachMoney, } from "react-icons/md";
import CardBox from '../../Components/Cards/CardBox';
import HorizontalTabs from '../../Components/Tabs/HorizontalTabs';
import { dashbordTabs } from '../../utils/sample';
import SortFunds from '../../Components/navigation/SortFunds';

function Dashboard() {

    const brandColor = useColorModeValue("#422AFB", "#422AFB");
    const boxBg = useColorModeValue("#F4F7FE", "#F4F7FE");
    return (
        <Box className='dashboard' style={{ padding: "10px", }}>
            <Header heading="Dashboard" />
            <DashboardHeader />
            <CardBox p="10px" my="10px">
                <Grid gap={4} templateColumns={['1fr', 'repeat(3, 1fr)']} sx={{ padding: "10px 0px ", borderRadius: "5px", display: "flex", justifyContent: "space-around", flexDirection: { base: "column", sm: "column", md: "row" }, textAlign: { base: "center", sm: "center" } }}>
                    <GridItem >
                        <CreateFundButton buttonName={"Create Funds"} info={"Connect to web3"} />
                    </GridItem>
                    <GridItem >
                        <FilterSearch />
                    </GridItem>
                    <GridItem >
                        <Button bg="#5E39FF" color={"#fff"} _hover={"none"} fontWeight="500"  textTransform={'uppercase'}>Total Funds: 30</Button>
                    </GridItem>
                    <GridItem >
                        <Stack bg="#5E39FF"  sx={{color:"#fff",borderRadius:"8px",border:"none",_hover: { backgroundColor: "#7500ff"}}}>
                            <SortFunds/>
                        </Stack>
                    </GridItem>
                </Grid>
            </CardBox>
            <Box>
                <SimpleGrid
                width="100%"
                    columns={{ base:1, md: 3, lg: 3,}}
                    gap='20px'
                    mb='20px'>
                    <ShadowBox
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                                }
                            />
                        }
                        name='Total value'
                        value='$350.4'
                    />
                    <ShadowBox
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                                }
                            />
                        }
                        name='Total profit'
                        value='$642.39'
                    />

                    <ShadowBox
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={<Icon w='28px' h='28px' as={MdAttachMoney} color={brandColor} />}
                            />
                        }
                        name='History total profit'
                        value='154'
                    />

                </SimpleGrid>
            </Box>

            <SimpleGrid>
                    <HorizontalTabs data={dashbordTabs} />
            </SimpleGrid>
        </Box>
    )
}

export default Dashboard




