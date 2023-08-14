import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import React from 'react'
import { EtherscanLink } from '../../../config';
import Card from '../../Card/Card'

function Footer({owner,smartFundAddress}) {

    return (
        <Box>
            <Card mt={5}>
                <Grid sx={{ display: "flex", justifyContent: "space-around",}} flexDirection={{base:"column" ,md:"row"}} gap={{base:"20px", md:"0"}}>
                    <GridItem fontWeight={600}>
                        Smart Fund: <a  style={{ color: "blue", fontWeight: "500" }} href={EtherscanLink + "address/" + smartFundAddress } target="_blank" rel="noopener noreferrer">{String(smartFundAddress).replace(String(smartFundAddress).substring(6,36),"...")}</a>
                    </GridItem>
                    <GridItem fontWeight={600}>
                        Owner: <a style={{ color: "blue", fontWeight: "500" }} href={EtherscanLink +"address/" + owner} target="_blank" rel="noopener noreferrer">{String(owner).replace(String(owner).substring(6,36),"...")}</a>
                    </GridItem>
                </Grid>
            </Card>
            <Heading fontSize="md" textAlign="center" py={10}>Since 2018: world's first live EthFi investments funds marketplace</Heading>
        </Box>
    )
}

export default Footer
