import React from 'react'
import { Button ,Tooltip,useColorModeValue } from '@chakra-ui/react'
import { EtherscanLink } from '../../config'



function EtherscanButton(props) {

    const tooltipBg = useColorModeValue("black", "#A4ADC7")

    return (
        <Tooltip hasArrow label="" bg={tooltipBg}>
            <Button  flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#5E39FF" color="#fff" sx={{ _hover: { backgroundColor: "#7500ff" } }}>
               <a style={{textDecoration:"none",width:"100%"}} href={EtherscanLink +"/address/" + props.address} target="_blank">Scan</a>
            </Button>
        </Tooltip>
    )
}

export default EtherscanButton
