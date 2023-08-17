import React from 'react';
import { Box, Flex, Heading,  Image, } from '@chakra-ui/react';
import { MdDarkMode } from 'react-icons/md'
import { BsFillSunFill } from "react-icons/bs"
// import { IoMdTabletLandscape, IoMdLaptop } from 'react-icons/io'
// import { MdOutlineDesktopMac } from "react-icons/md"
// import { useTheme } from '@chakra-ui/react';


const Navbar = ({ isChange , changeTheme,colorMode,toggleColorMode}) => {
    // function fullWidth() {
    //     if (!document.body.classList.contains('fullWidth_container')) {
    //         document.body.classList.remove('tablet_container');
    //         document.body.classList.remove('laptop_container');
    //         document.body.classList.add('fullWidth_container');
    //     }
    // }

    // function laptopWidth() {
    //     if (!document.body.classList.contains('laptop_container')) {
    //         document.body.classList.remove('fullWidth_container');
    //         document.body.classList.remove('tablet_container');
    //         document.body.classList.add('laptop_container');
    //     }
    // }

    // function tabletWidth() {
    //     if (!document.body.classList.contains('tablet_container')) {
    //         document.body.classList.remove('fullWidth_container');
    //         document.body.classList.remove('laptop_container');
    //         document.body.classList.add('tablet_container');
    //     }
    // }


    return (
        <React.Fragment>
            <Box bg="#7500ff" padding="15px" color="white" height="10vh">
                <Flex justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={4} >
                        <Heading as="h1" size="lg" cursor={'pointer'}>
                            <Image src='/logo.png' alt='' height="24px" />
                        </Heading>
                    </Box>
                    <Box display="flex" alignItems="center" fontSize="2xl" cursor={'pointer'} gap={2}>
                        <span onClick={toggleColorMode} style={{ display: "flex", alignItems: "center" }}>        
                        <BsFillSunFill title='Light' /> / <MdDarkMode title='Dark'/>           
                        </span>
                    </Box>
                </Flex>
            </Box>
        </React.Fragment>
    );
}
export default Navbar;


