import React from 'react'
import { Button ,Tooltip,useColorModeValue,Link } from '@chakra-ui/react'
import { EtherscanLink } from '../../config'

function EtherscanButton(props) {
    const allbtnBg=useColorModeValue("#039be5","#039be5")

    return (
       <React.Fragment>
       {
        !props.web3 ? (
            <Tooltip hasArrow label="Please connect to web3">
                <Button flexGrow="1" minWidth={{ base: '100%', sm: "auto" }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#027CB8" } }}>Scan </Button>
            </Tooltip>
        ) : (
            <Button  flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} sx={{ _hover: { backgroundColor: "#027CB8" } }}>
               <Link style={{textDecoration:"none",width:"100%",fontWeight:"bold",color:"white"}} href={EtherscanLink +"/address/" + props.address} target="_blank">Scan</Link>
            </Button>
        )
    }
       </React.Fragment>
           
       
    )
}

export default EtherscanButton
