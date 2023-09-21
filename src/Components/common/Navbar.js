import React from 'react';
import { Box, Flex, Heading,  IconButton,  Image, useColorMode, useColorModeValue, } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';


const Navbar = (props) => {
    const { toggleColorMode } = useColorMode();
    const iconColor = useColorModeValue('gray.800', 'gray.100');
    const btncolor=useColorModeValue("#fff","#30106b")
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


