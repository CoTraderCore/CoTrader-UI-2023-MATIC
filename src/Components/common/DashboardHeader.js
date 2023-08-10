import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import Web3Allert from '../Web3Off/Web3Alert'
function DashboardHeader() {
  return (
    <Grid gap={4} sx={{ textAlign: 'center', fontWeight: "500" }}>
      <GridItem style={{ borderRadius: "5px", padding: "10px 5px", boxShadow: "1px 1px 1px 1px gray", border: "1px solid white" }}>
        DeFi investment funds - create or join the best smart funds on the blockchain
      </GridItem>
      <GridItem style={{ borderRadius: "5px", boxShadow: "1px 1px 1px 1px gray", border: "1px solid white" }} >
        <Web3Allert />
      </GridItem>
    </Grid>
  )
}

export default DashboardHeader
