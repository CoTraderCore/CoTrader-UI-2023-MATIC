import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'

function Header({heading}) {
  const path=useLocation()

  return (
  
    <Grid p={2} bg="rgba(207, 244, 254, .4)" style={{position:"sticky",top:"0px",borderRadius:"10px",zIndex:"10000"}}>
      <GridItem >
      <p style={{fontWeight:"bold"}}>Pages <span style={{color:"#422AFB"}}> {path.pathname}</span></p>
        <h1 style={{fontSize:'36px', fontWeight:"600"}}>{heading}</h1>
      </GridItem>
    </Grid>
    
  )
}

export default Header
