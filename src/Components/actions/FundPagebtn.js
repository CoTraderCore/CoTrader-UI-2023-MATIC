import { Button, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

function FundPagebtn(props) {

    const allbtnBg = useColorModeValue("#30106b", "#7500FF")
    return (
        <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
            <NavLink to={"/fund/" + props.address}>Fund Page</NavLink>
        </Button>
    )
}

export default FundPagebtn
