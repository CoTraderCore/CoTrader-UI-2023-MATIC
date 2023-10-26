import React from 'react'
 import { Button,Tooltip, useColorModeValue, } from '@chakra-ui/react'
function CreateFundButton(props) {
  const tooltipBg = useColorModeValue("black", "#A4ADC7")
  const allbtnBg = useColorModeValue("#039be5", "#039be5")
  const allbtntxtcolor=useColorModeValue("#fff","gray.200")

  return (
    <React.Fragment>
    <Tooltip hasArrow label={props.info} bg={tooltipBg}>
    <Button bg={allbtnBg} color={allbtntxtcolor} sx={{textTransform:"uppercase",width:{base:"100%",},_hover: { backgroundColor: "#027CB8" }}}>{ props.buttonName }</Button>
  </Tooltip>
    </React.Fragment>
  )
}

export default CreateFundButton
