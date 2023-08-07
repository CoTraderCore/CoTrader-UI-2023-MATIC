import React from 'react'
import {Grid,GridItem} from '@chakra-ui/react'
function DashboardHeader() {
  return (
    <Grid gap={2}  sx={{textAlign:'center',fontWeight:"500"}}>
    <GridItem  style={{borderRadius:"5px",padding:"10px 5px",boxShadow:"2px 2px 2px gray"}}>
    DeFi investment funds - create or join the best smart funds on the blockchain
    </GridItem>
    <GridItem  style={{borderRadius:"5px",padding:"10px 5px",boxShadow:"2px 2px 2px gray"}} >
    Please connect web3: use MetaMask for <span style={{color:"#8073DE"}}>laptop</span> or <span style={{color:"#8073DE"}}>Android</span>, or Coinbase Wallet for <span style={{color:"#8073DE"}}>iPhone</span>
  </GridItem>
  </Grid>
  )
}

export default DashboardHeader
