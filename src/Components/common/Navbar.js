import React from 'react';
import { Box, Flex, Heading,  Image, } from '@chakra-ui/react';
import { MdDarkMode } from 'react-icons/md'
import { BsFillSunFill } from "react-icons/bs"
import { Link } from 'react-router-dom';


const Navbar = (props) => {


    return (
        <React.Fragment>
            <Box bg="#7500ff" padding="15px" color="white" height="10vh">
                <Flex justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={4} >
                        <Heading as="h1" size="lg" cursor={'pointer'}>
                          <Link to={props.web3? "/" : "/web3off"}><Image src='/logo.png' alt='CoTrader' height="24px" /></Link>
                        </Heading>
                    </Box>
                    <Box display="flex" alignItems="center" fontSize="2xl" cursor={'pointer'} gap={2}>
                        <span onClick={props.toggleColorMode} style={{ display: "flex", alignItems: "center" }}>        
                        <BsFillSunFill title='Light'/> / <MdDarkMode title='Dark'/>           
                        </span>
                    </Box>
                </Flex>
            </Box>
        </React.Fragment>
    );
}
export default Navbar;


