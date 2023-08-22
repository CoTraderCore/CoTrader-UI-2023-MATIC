import { Grid, GridItem,} from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'

function Header({heading}) {
  const path=useLocation()
  const pagePath=path.pathname.substring(0,14)

 
  return (
  
    <Grid p={2}
     style={{
      position: "sticky",
      top: "0px",
      borderRadius: "5px",
      zIndex: "100",
      backdropFilter: "blur(10px)",
      backgroundColor: "#F4F7FE0",
    }}>
      <GridItem >
      <p style={{fontWeight:"bold",}}>Pages <span style={{color:"#7500ff"}}> {pagePath}</span></p>
        <h1 style={{fontSize:'36px', fontWeight:"600",}}>{heading}</h1>
      </GridItem>
    </Grid>
    
  )
}

export default Header
