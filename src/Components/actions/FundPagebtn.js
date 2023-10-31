import { Button, useColorModeValue, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function FundPagebtn(props) {

    const allbtnBg = useColorModeValue("#039be5", "#039be5")
    return (
        <React.Fragment>
            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#027CB8" } }}>
                <Link to={"/fund/" + props.address}>Fund Page</Link>
            </Button>
        </React.Fragment>

    )
}

export default FundPagebtn
