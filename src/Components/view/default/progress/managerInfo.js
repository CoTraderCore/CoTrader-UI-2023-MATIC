import {Heading, List, ListItem, Progress, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Card from '../../../Card/Card';

function ManagerInfo() {
    const headingColor = useColorModeValue("#1B2559", "#F4F7FE");
    const totalprogressBg=useColorModeValue("green.100","white")
    const colorSchemeGreen=useColorModeValue("green","green")
    const colorSchemeRed=useColorModeValue("red","red")
    const remainingprogressBg=useColorModeValue("red.100","white")
    return (
       <Card width={{ base: "100%", md: "30%" }} bg={"rgba(128, 144, 255,.1)"}>
       <Heading fontSize={{ base: "xl", md: "2xl" }} sx={{ textAlign: "center", textTransform: "uppercase", color: { headingColor }, padding: "10px 0px" }}>MANAGER INFO</Heading>
       <List  p={5} width={{ base: "100%", md: "100%" }} textAlign={'center'} borderRadius={"10px"}>
       <ListItem py={4}>
           <span style={{ color: { headingColor }, fontWeight: "600" }}> Total Cut:0</span>
           <Stack spacing={5}>
               <Progress bg={totalprogressBg} colorScheme={colorSchemeGreen} size='md' value={20} sx={{ borderRadius: "20px" }} />
           </Stack>
       </ListItem>
       <ListItem py={4}>
           <span style={{ color: { headingColor }, fontWeight: "600" }}> Remaining Cut:0</span>
           <Stack spacing={5} >
               <Progress bg={remainingprogressBg} colorScheme={colorSchemeRed} size='md' value={20} sx={{ borderRadius: "20px" }} />
           </Stack>
       </ListItem>
   </List>
       </Card>
    )
}

export default ManagerInfo
