import React, { useState } from 'react'
import Navbar from '../Components/common/Navbar'
import Sidebar from '../Components/common/Sidebar'
import { Box, Grid, GridItem, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';
// import { useLocation } from 'react-router-dom';

function MainLayout({ component, }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isChange, setIsChange] = useState(false)
    const { colorMode, toggleColorMode } = useColorMode(false)
    const theme = useTheme()
    const Boxbg = useColorModeValue("#F3F6FD", "#110938");
    console.log(theme);

    function changeTheme() {
        if (document.body.classList.contains('dark_theme')) {
            document.body.classList.add('light_theme');
            document.body.classList.remove('dark_theme');
        } else {
            document.body.classList.add('dark_theme');
            document.body.classList.remove('light_theme');
        }
        setIsChange(!isChange)
    }
    return (
        <Box
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                position: "relative"
            }}
        >
            <Navbar isOpen onOpen onClose isChange={isChange} setIsChange changeTheme={changeTheme} toggleColorMode={toggleColorMode} colorMode={colorMode} />
            <Grid style={{ display: 'flex', flexWrap: "nowrap", overflow: "auto", height: "90vh", }} >
                <GridItem >
                    <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} component={component} isChange={isChange} />
                </GridItem>
                <GridItem className='example' bg={Boxbg} style={{ flexGrow: 1, overflow: "auto", }}>
                    <Outlet />
                </GridItem>
            </Grid>


        </Box>
    )
}

export default MainLayout
