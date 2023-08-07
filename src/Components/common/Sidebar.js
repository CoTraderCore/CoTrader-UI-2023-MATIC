import React from 'react';
import { Grid, GridItem, List, ListItem } from '@chakra-ui/react';
import { BiSolidShareAlt, BiLogoTelegram } from 'react-icons/bi';
import { AiOutlineTwitter } from "react-icons/ai"
import { GiShoppingBag } from "react-icons/gi"
import { BiSolidMessageAltDetail, } from 'react-icons/bi'
import { AiFillHome } from 'react-icons/ai'
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom';
import { DashboardPages } from '../utils/Pages';

const menuItems = [
    {
        name: "Dashboard",
        id: 0,
        path: DashboardPages.DASHBOARD,
        icon: AiFillHome
    },
    {
        name: "About",
        id: 0,
        path: DashboardPages.ABOUT,
        icon: BiSolidMessageAltDetail
    },
    {
        name: "Stack COT",
        id: 0,
        path: DashboardPages.STACK,
        icon: BiSolidShareAlt
    },
    {
        name: "Byu COT",
        id: 0,
        path: DashboardPages.BUY,
        icon: GiShoppingBag
    },

    {
        name: "Telegram",
        id: 0,
        path: DashboardPages.TELEGRAM,
        icon: BiLogoTelegram
    },
    {
        name: "Twitter",
        id: 0,
        path: DashboardPages.TWITTER,
        icon: AiOutlineTwitter
    },
]

const Menu_style = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "10px 20px",
    width: "100%",
    color: "black",
    textDecoration: "none"
}

function Sidebar({ isOpen, onOpen, onClose, }) {

    return (
        <Grid w='100%' position={'relative'} >
            <GridItem w="auto" height="100vh" style={{ background: "#fff", position: "sticky", left: "0", top: "0", }}>
                <List p={1} >
                    <ListItem>
                        <span style={{ padding: "10px 25px", color: "black", display: "flex", justifyContent: "end" }} onClick={isOpen ? onClose : onOpen}>
                            {
                                isOpen ? <ArrowLeftIcon sx={{ _active: { color: "#8073de" } }} /> : <ArrowRightIcon sx={{ _active: { color: "#8073de" } }} />
                            }
                        </span>
                    </ListItem>
                    {menuItems.map((item) => {
                        return <ListItem sx={{ ":hover": { backgroundColor: "lightgray", transition: ".3s" } }}>
                            <Link to={item.path} style={{ ...Menu_style }}><item.icon style={{ fontSize: "1.7rem", color: "#8073de", }} />
                                <span
                                    className={isOpen ? 'hidden-text' : 'show-text'}
                                >{item.name}</span>
                            </Link>
                        </ListItem>
                    })}
                </List>
            </GridItem>
        </Grid>
    )
}

export default Sidebar
