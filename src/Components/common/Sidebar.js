import React from 'react';
import { Grid, GridItem, List, ListItem, useColorModeValue } from '@chakra-ui/react';
import { BiSolidShareAlt, BiLogoTelegram } from 'react-icons/bi';
import { AiOutlineTwitter } from "react-icons/ai"
import { GiShoppingBag } from "react-icons/gi"
import { BiSolidMessageAltDetail, } from 'react-icons/bi'
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom';

const menuItems = [
    {
        name: "About",
        id: 0,
        path: "https://cotrader.com/",
        icon: BiSolidMessageAltDetail,
        title: "About"
    },
    {
        name: "Stack COT",
        id: 0,
        path: "https://cotrader.com/",
        icon: BiSolidShareAlt,
        title: "Stack Cot"
    },
    {
        name: "Buy COT",
        id: 0,
        path: "https://app.1inch.io/#/1/swap/ETH/COT",
        icon: GiShoppingBag,
        title: "Buy Cot"
    },

    {
        name: "Telegram",
        id: 0,
        path: "https://t.me/cotrader",
        icon: BiLogoTelegram,
        title: "Telegram"
    },
    {
        name: "Twitter",
        id: 0,
        path: "https://twitter.com/cotrader_com",
        icon: AiOutlineTwitter,
        title: "Twitter"
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

function Sidebar({ isOpen, onOpen, onClose, }) {
    
    const ArrowBg = useColorModeValue("black", "white");
    const sliderBg = useColorModeValue("#fff", "#181144")
    const Iconcolor=useColorModeValue("#30106b","#FFF")
    return (
        <Grid w='100%'>
            <GridItem w="auto" height="90vh" bg={sliderBg} sx={{}}>
                <List p={1} >
                    <ListItem sx={{ borderBottom: "1px solid gray" }}>
                        <span style={{ padding: "10px 25px", display: "flex", justifyContent: "end" }} onClick={isOpen ? onClose : onOpen}>
                            {
                                isOpen ? <ArrowLeftIcon color={ArrowBg} /> : <ArrowRightIcon color={ArrowBg} />
                            }
                        </span>
                    </ListItem>
                    {menuItems.map((item, key) => {
                    
                        return <ListItem key={key}>
                            <a target='_blank' href={item.path} style={{ ...Menu_style }}><item.icon title={item.title} style={{ fontSize: "1.7rem", color: Iconcolor }} />
                                <span
                                    style={{ color:"gray" }}
                                    className={isOpen ? 'hidden-text' : 'show-text'}
                                >{item.name}</span>
                            </a>
                        </ListItem>
                    })}
                </List>
            </GridItem>
        </Grid>
    )
}

export default Sidebar;