import React from 'react';
import { Grid, GridItem, List, ListItem, useColorModeValue } from '@chakra-ui/react';
import { BiSolidShareAlt, BiLogoTelegram } from 'react-icons/bi';
import { AiOutlineTwitter } from "react-icons/ai"
import { GiShoppingBag } from "react-icons/gi"
import { BiSolidMessageAltDetail, } from 'react-icons/bi'
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const menuItems = [
    {
        name: "About",
        id: 0,
        path:"https://cotrader.com/",
        icon: BiSolidMessageAltDetail
    },
    {
        name: "Stack COT",
        id: 0,
        path: "https://cotrader.com/",
        icon: BiSolidShareAlt
    },
    {
        name: "Byu COT",
        id: 0,
        path: "https://app.1inch.io/#/1/swap/ETH/COT",
        icon: GiShoppingBag
    },

    {
        name: "Telegram",
        id: 0,
        path:"https://t.me/cotrader",
        icon: BiLogoTelegram
    },
    {
        name: "Twitter",
        id: 0,
        path: "https://twitter.com/cotrader_com",
        icon: AiOutlineTwitter
    },
]

const Menu_style = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "10px 20px",
    width: "100%",
    textDecoration: "none"
}

function Sidebar({ isOpen, onOpen, onClose, isChange }) {
    const location = useLocation();
    const ArrowBg = useColorModeValue("black", "white");
    const sliderBg = useColorModeValue("#fff", "#181144")
    return (
        <Grid w='100%'>
            <GridItem w="auto" height="90vh" bg={sliderBg} sx={{}}>
                <List p={1} >
                    <ListItem>
                        <span style={{ padding: "10px 25px", display: "flex", justifyContent: "end" }} onClick={isOpen ? onClose : onOpen}>
                            {
                                isOpen ? <ArrowLeftIcon color={ArrowBg} /> : <ArrowRightIcon color={ArrowBg} />
                            }
                        </span>
                    </ListItem>
                    {menuItems.map((item,key) => {
                        const isActive = location.pathname === item.path;
                        return <ListItem key={key}> 
                            <Link target='_blank' to={item.path} style={{ ...Menu_style }}><item.icon style={{ fontSize: "1.7rem", color: isActive ? "#5E39FF" : "#A4ADC7", }} />
                                <span
                                    style={{ color: isActive ? "#CBC3E3" : "#A4ADC7" }}
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
