import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box, GridItem, Select, useColorModeValue, OrderedList, ListItem, Icon, Grid, SimpleGrid } from '@chakra-ui/react';
import { EtherscanLink } from '../../config';
import getUserData from '../../utils/getFundData';
import { fromWei } from 'web3-utils';
import { HiReceiptTax } from 'react-icons/hi'
import ShadowBox from '../../Components/Cards/ShadowBox';
import IconBox from '../../Components/Icons/IconBox';
import Footer from '../../Components/common/footer/Footer';
import Header from '../../Components/common/Header';

const ETH_TOKEN = String("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE").toLowerCase()

function ViewUserTx() {
    const { address } = useParams();
    const addressbg = useColorModeValue("#E6E6FA", "#181144")
    const textColor = useColorModeValue("#A4ADC7", "white");
    const iconColor = useColorModeValue("#244AFB", "#7500FF");
    const BOXBG = useColorModeValue("#F4F7FE", "#110938");

    const [data, setData] = useState([]);
    const [funds, setFunds] = useState([]);
    const [deposit, setDeposit] = useState([]);
    const [trade, setTrade] = useState([]);
    const [withdraw, setWithdraw] = useState([]);
    const [showFundsTX, setShowFundsTX] = useState(true);
    const [showDepositTX, setShowDepositTX] = useState(true);
    const [showTradeTX, setShowTradeTX] = useState(true);
    const [showWithdrawTX, setShowWithdrawTX] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                const userData = await getUserData(address);

                if (isMounted) {
                    setData(userData.data.result[0]);
                    setFunds(JSON.parse(userData.data.result[0].funds));
                    setDeposit(JSON.parse(userData.data.result[0].deposit));
                    setTrade(JSON.parse(userData.data.result[0].trade));
                    setWithdraw(JSON.parse(userData.data.result[0].withdraw));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchData();
    })

    const toggle = (name) => {
        switch (name) {
            case 'showFundsTX':
                setShowFundsTX(!showFundsTX);
                break;
            case 'showDepositTX':
                setShowDepositTX(!showDepositTX);
                break;
            case 'showTradeTX':
                setShowTradeTX(!showTradeTX);
                break;
            case 'showWithdrawTX':
                setShowWithdrawTX(!showWithdrawTX);
                break;
            default:
                break;
        }
    };

    const renderTx = (data, stateName) => {
        return (
            <React.Fragment>
                {
                    data && data.length > 0
                        ?
                        (
                            <React.Fragment>
                                {data.map((item, key) =>
                                    <OrderedList key={item.transactionHash} sx={{ listStyle: "none", textTransform: "capitalize", color: textColor }}>
                                        <ListItem>blockNumber: <a href={EtherscanLink + "/block/" + item.blockNumber} target="_blank" rel="noopener noreferrer">{item.blockNumber}</a></ListItem>
                                        <ListItem>Tx hash: <a href={EtherscanLink + "/tx/" + item.transactionHash} target="_blank" rel="noopener noreferrer">{item.transactionHash}</a></ListItem>
                                        <ListItem>Fund address: <a href={EtherscanLink + "/address/" + item.fund} target="_blank" rel="noopener noreferrer">{item.fund}</a></ListItem>
                                        {additionalData(item, stateName)}
                                    </OrderedList>
                                )}
                            </React.Fragment>
                        )
                        :
                        (
                            <OrderedList sx={{ listStyle: "none", textTransform: "capitalize", color: textColor }}>
                                <ListItem>no tx</ListItem>
                            </OrderedList>

                        )
                }
            </React.Fragment>
        )
    }

    const additionalData = (data, state) => {
        switch (state) {
            case 'funds':
                return (null)

            case 'deposit':
                return (
                    <OrderedList sx={{ listStyle: "none", textTransform: "capitalize", color: textColor }}>
                        <ListItem>Aditional data</ListItem>
                        <ListItem>Deposit amount: {fromWei(data.additionalData.amount)} </ListItem>
                        <ListItem>Total shares: {fromWei(data.additionalData.totalShares)} </ListItem>
                        <ListItem>Shares received: {fromWei(data.additionalData.sharesReceived)} </ListItem>
                    </OrderedList>
                )

            case 'trade':
                return (
                    <OrderedList sx={{ listStyle: "none", textTransform: "capitalize", color: textColor }}>
                        <ListItem>Aditional data</ListItem>
                        <ListItem>src token address:
                            {
                                String(data.additionalData.src).toLowerCase() === ETH_TOKEN
                                    ?
                                    (
                                        <>BNB</>
                                    )
                                    :
                                    (
                                        <a href={EtherscanLink + "/token/" + data.additionalData.src} target="_blank" rel="noopener noreferrer">
                                            {data.additionalData.src}
                                        </a>
                                    )
                            }
                        </ListItem>
                        <ListItem>amount send: {fromWei(data.additionalData.srcAmount)} </ListItem>
                        <ListItem>dest token address:
                            {
                                String(data.additionalData.dest).toLowerCase() === ETH_TOKEN
                                    ?
                                    (
                                        <>BNB</>
                                    )
                                    :
                                    (
                                        <a href={EtherscanLink + "/token/" + data.additionalData.dest} target="_blank" rel="noopener noreferrer">
                                            {data.additionalData.dest}
                                        </a>
                                    )
                            }
                        </ListItem>
                        <ListItem>dest recived amount: {fromWei(data.additionalData.destReceived)}</ListItem>
                    </OrderedList>
                )

            case 'withdraw':
                return (
                    <OrderedList sx={{ listStyle: "none", textTransform: "capitalize", color: textColor }}>
                        <ListItem>Aditional data</ListItem>
                        <ListItem>Shares removed: {fromWei(data.additionalData.sharesRemoved)} </ListItem>
                        <ListItem>Total shares: {fromWei(data.additionalData.totalShares)} </ListItem>
                    </OrderedList>
                )

            default:
                return null
        }
    }


    return (
        <React.Fragment>
            <Box p={5} >
            <Header heading="View-User-Tx"/>
                <Box mt={5}>
                    <Grid py={5} sx={{ display: "flex", alignItems: "center", }}>
                        <GridItem>
                            <Select onChange={(e) => toggle(e.target.value)}>
                                <option value="" hidden>Sortin tx</option>
                                <option value="showFundsTX">{showFundsTX ? "Disable" : "Enable"} funds tx</option>
                                <option value="showDepositTX">{showDepositTX ? "Disable" : "Enable"} deposit tx</option>
                                <option value="showTradeTX">{showTradeTX ? "Disable" : "Enable"} trade tx</option>
                                <option value="showWithdrawTX">{showWithdrawTX ? "Disable" : "Enable"} withdraw tx</option>
                            </Select>
                        </GridItem>
                    </Grid>

                    <Box sx={{ boxShadow: "0px 1px 1px 1px lightgray", borderRadius: "10px", }}>
                        <h5 style={{ fontWeight: "500", textAlign: "center", backgroundColor: addressbg, padding: "10px 5px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>  All transactions for address : <small> <a className='link' style={{ color: "#7500FF" }} href={EtherscanLink + "/address/" + address} target="_blank" rel="noopener noreferrer">{address}</a></small></h5>
                        <SimpleGrid p={5} pb={5} columns={{ base: 1, md: 2 }} spacing={{ base: 5, md: 10 }}>
                            {
                                showFundsTX ?
                                    (
                                        <ShadowBox
                                            startContent={
                                                <IconBox
                                                    w='56px'
                                                    h='56px'
                                                    bg={BOXBG}
                                                    icon={
                                                        <Icon w='32px' h='32px' as={HiReceiptTax} color={iconColor} />
                                                    }
                                                />
                                            }
                                            name='CREATE FUND TX'
                                            value={renderTx(funds, "deposit")}
                                        />
                                    )
                                    : (null)
                            }
                            {
                                showDepositTX ?
                                    (
                                        <ShadowBox
                                            startContent={
                                                <IconBox
                                                    w='56px'
                                                    h='56px'
                                                    bg={BOXBG}
                                                    icon={
                                                        <Icon w='32px' h='32px' as={HiReceiptTax} color={iconColor} />
                                                    }
                                                />
                                            }
                                            name='DEPOSITE TX'
                                            value={renderTx(deposit, "deposit")}
                                        />
                                    )
                                    : (null)
                            }

                            {
                                showTradeTX ?
                                    (
                                        <ShadowBox
                                            startContent={
                                                <IconBox
                                                    w='56px'
                                                    h='56px'
                                                    bg={BOXBG}
                                                    icon={
                                                        <Icon w='32px' h='32px' as={HiReceiptTax} color={iconColor} />
                                                    }
                                                />
                                            }
                                            name='TRADE TX'
                                            value={renderTx(trade, "trade")}
                                        />
                                    )
                                    : (null)
                            }
                            {
                                showWithdrawTX ?
                                    (
                                        <ShadowBox
                                            startContent={
                                                <IconBox
                                                    w='56px'
                                                    h='56px'
                                                    bg={BOXBG}
                                                    icon={
                                                        <Icon w='32px' h='32px' as={HiReceiptTax} color={iconColor} />
                                                    }
                                                />
                                            }
                                            name='WITHDRAW TX'
                                            value={renderTx(withdraw, "withdraw")}
                                        />
                                    )
                                    : (null)
                            }
                        </SimpleGrid>
                    </Box>
                    <Footer />
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default ViewUserTx;
