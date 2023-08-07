import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

function Header({heading}) {
  return (
    <Grid>
      <GridItem>
        <h1 style={{fontSize:'36px', fontWeight:"600"}}>{heading}</h1>
      </GridItem>
    </Grid>
  )
}

export default Header
