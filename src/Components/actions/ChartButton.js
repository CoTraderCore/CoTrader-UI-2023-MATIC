import React from 'react'
import { Button, Tooltip, useColorModeValue } from '@chakra-ui/react'
// import { BloxyLink } from '../../config'

function ChartsButton () {
    const tooltipBg = useColorModeValue("black", "#A4ADC7")
   
        return (
            <Tooltip hasArrow label="" bg={tooltipBg}>
            <Button  target="_blank" flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg="#4318ff" color="#fff" sx={{ _hover: { backgroundColor: "#4318ffcc" } }}>Bloxy </Button>
            </Tooltip>
        )
    
}

export default ChartsButton
