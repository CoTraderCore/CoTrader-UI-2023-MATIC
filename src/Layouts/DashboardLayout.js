import React, { useState } from 'react'
import Navbar from '../Components/common/Navbar'
import Sidebar from '../Components/common/Sidebar'
import { Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

function DashboardLayout({ component }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChange, setIsChange] = useState(false)

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
      <Navbar isOpen onOpen onClose isChange={isChange} setIsChange changeTheme={changeTheme} />
      <Grid
        style={{display:'flex', flexWrap: "nowrap", overflow: "auto" }}
      >
        <GridItem 
        >
          <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} component={component} />
        </GridItem>

        <GridItem 
          style={{ flexGrow: 1, overflow: "auto", backgroundColor: "#F8F8F8" }}
        >
          <Outlet />
        </GridItem>
      </Grid>


    </div>
  )
}

export default DashboardLayout
