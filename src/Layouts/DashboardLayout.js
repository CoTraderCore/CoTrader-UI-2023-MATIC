import React, { useState } from 'react'
import Navbar from '../Components/common/Navbar'
import Sidebar from '../Components/common/Sidebar'
import { Grid, GridItem, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';
// import { useLocation } from 'react-router-dom';

function DashboardLayout({ component,}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChange, setIsChange] = useState(false)
  const {colorMode , toggleColorMode} = useColorMode(false)
  const theme = useTheme()
  console.log(theme,">>>>>>>>>>>>>>>==================");
  const Boxbg = useColorModeValue("#F3F6FD", "rgba(0,0,0,0.4)");

 
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
    // <div style={{backgroundColor:"#f3f2fa"}}>
    //   <Navbar isOpen onOpen onClose isChange={isChange} setIsChange changeTheme={changeTheme} />
    //   <div style={{display : "flex",}}>
    //     <Sidebar isOpen={isOpen}  onOpen={onOpen} onClose={onClose} component={component}/>
    //     <div style={{width:'100%'}}>
    //     <Outlet />
    //     </div>
    //   </div>
    // </div>
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Navbar isOpen onOpen onClose isChange={isChange} setIsChange changeTheme={changeTheme} toggleColorMode={toggleColorMode} colorMode={colorMode} />
      <Grid
        style={{display:'flex', flexWrap: "nowrap", overflow: "auto" }}
      >
        <GridItem 
        >
          <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} component={component} isChange={isChange} />
        </GridItem>

        <GridItem 
        bg={Boxbg}
          style={{ flexGrow: 1, overflow: "auto",}}
        >
          <Outlet />
        </GridItem>
      </Grid>


    </div>
  )
}

export default DashboardLayout
