import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
function DashboardHeader() {
  return (
    <Grid sx={{ textAlign: 'center', fontWeight: "500" }}>
      <GridItem style={{ borderRadius: "5px", padding: "10px 5px", boxShadow: "1px 1px 1px 1px gray", border: "1px solid white" }}>
        DeFi investment funds - create or join the best smart funds on the blockchain
      </GridItem>
    </Grid>
  )
}

export default DashboardHeader
