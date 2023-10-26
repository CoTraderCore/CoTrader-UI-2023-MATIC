import React from 'react';
import { Box, Flex, Heading,  IconButton, Image, useColorMode, useColorModeValue, } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';


const Navbar = (props) => {
    const { toggleColorMode } = useColorMode();
    const iconColor = useColorModeValue('gray.800', 'gray.100');
    const btncolor=useColorModeValue("#fff","#1a202c")
    return (
        <React.Fragment>
            <Box bg="#039be5" padding="15px" color="white" height="10vh">
                <Flex justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" >
                        <Heading cursor={'pointer'}>
                          <Link to={props.web3? "/" : "/web3off"}><Image src='/logo.png' alt='CoTrader' height="25px" /></Link>
                        </Heading>
                    </Box>
                    <Box display="flex" alignItems="center" cursor={'pointer'}>
                        <IconButton
                        bg={btncolor}
                        aria-label="Toggle dark mode"
                        icon={useColorModeValue(<FaMoon />,<FaSun />)} 
                        onClick={toggleColorMode}
                        size="sm"
                        color={iconColor}
                        />
                    </Box>
                </Flex>
            </Box>
        </React.Fragment>
    );
}
export default Navbar;


