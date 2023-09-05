import React from 'react'
 import { Button,Tooltip, useColorModeValue, } from '@chakra-ui/react'
function CreateFundButton(props) {
  const tooltipBg = useColorModeValue("black", "#A4ADC7")
  const allbtnBg = useColorModeValue("#30106b", "#7500FF")

  return (
    <React.Fragment>
    <Tooltip hasArrow label={props.info} bg={tooltipBg}>
    <Button bg={allbtnBg} color="#fff" sx={{textTransform:"uppercase",width:{base:"100%",},_hover: { backgroundColor: "#30108b" }}}>{ props.buttonName }</Button>
  </Tooltip>
    </React.Fragment>
  )
}

export default CreateFundButton
