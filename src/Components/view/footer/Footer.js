import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import React from 'react'
import Card from '../../Card/Card'

function Footer() {
    return (
        <Box>
        <Card mt={5}>
            <Grid sx={{ display: "flex", justifyContent: "space-around" }}>
                <GridItem fontWeight={600}>
                    Smart Fund: <a style={{ color: "blue",fontWeight:"500" }} href='https://bscscan.com/address/0x36BDe6F520613Ce99dAC0b255492c533Ca3Dd8e0' rel="noreferrer" target='_blank'> 0x36BD...3Dd8e0</a>
                </GridItem>
                <GridItem fontWeight={600}> 
                    Owner: <a style={{ color: "blue",fontWeight:"500" }} href='https://bscscan.com/address/0x2408629190394033e7E4279918e1BeC606820b02' rel="noreferrer" target='_blank' >0x2408...820b02</a>
                </GridItem>
            </Grid>
        </Card>
        <Heading fontSize="md" textAlign="center" py={10}>Since 2018: world's first live EthFi investments funds marketplace</Heading>
        </Box>
    )
}

export default Footer
