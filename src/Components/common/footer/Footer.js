import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import React from 'react'
// import getFundData from '../../../utils/getFundData';
// import { EtherscanLink } from '../../../config';
import Card from '../../Card/Card'
// import { useParams } from 'react-router-dom';

function Footer() {

    return (
        <Box>
            <Card mt={5}>
                <Grid sx={{ display: "flex", justifyContent: "space-around" }}>
                    <GridItem fontWeight={600}>
                        Smart Fund: <a href="/" target="_blank" rel="noopener noreferrer">===========</a>
                    </GridItem>
                    <GridItem fontWeight={600}>
                        Owner: <a style={{ color: "blue", fontWeight: "500" }} href="/" target="_blank" rel="noopener noreferrer">+++++++++</a>
                    </GridItem>
                </Grid>
            </Card>
            <Heading fontSize="md" textAlign="center" py={10}>Since 2018: world's first live EthFi investments funds marketplace</Heading>
        </Box>
    )
}

export default Footer
