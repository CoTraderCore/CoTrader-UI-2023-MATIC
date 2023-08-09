import React from 'react'
 import { Button,Tooltip, useColorModeValue, } from '@chakra-ui/react'
function CreateFundButton(props) {
  const tooltipBg = useColorModeValue("black", "#A4ADC7")
  return (
    <React.Fragment>
    <Tooltip hasArrow label={props.info} bg={tooltipBg}>
    <Button bg="#4318ff" color="#fff" sx={{textTransform:"uppercase",width:{base:"100%",},_hover: { backgroundColor: "#4318ffcc" }}}>{ props.buttonName }</Button>
  </Tooltip>
    </React.Fragment>
  )
}

export default CreateFundButton
