import React from 'react'
import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react'
function DashboardHeader() {
const txtColor=useColorModeValue("#039BE5","#fff")
  return (
    <Grid  pb={1} sx={{ textAlign: 'center', fontWeight: "500" }}>
      <GridItem sx={{ borderRadius: "5px", padding: "10px 5px", boxShadow: "1px 1px 1px 1px gray", border: "1px solid white",color:txtColor,fontSize:"sm" }}>
        DeFi investment funds - create or join the best smart funds on the blockchain
      </GridItem>
    </Grid>
  )
}

export default DashboardHeader
