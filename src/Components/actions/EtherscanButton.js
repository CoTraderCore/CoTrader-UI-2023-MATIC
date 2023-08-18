import React from 'react'
import { Button ,Tooltip,useColorModeValue,Link } from '@chakra-ui/react'
import { EtherscanLink } from '../../config'

function EtherscanButton(props) {
    const tooltipBg = useColorModeValue("black", "#A4ADC7")
    
    return (
        <Tooltip hasArrow label="" bg={tooltipBg}>
            <Button  flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#5E39FF" sx={{ _hover: { backgroundColor: "#7500ff" } }}>
               <Link style={{textDecoration:"none",width:"100%",fontWeight:"bold",color:"white"}} href={EtherscanLink +"/address/" + props.address} target="_blank">Scan</Link>
            </Button>
        </Tooltip>
    )
}

export default EtherscanButton
