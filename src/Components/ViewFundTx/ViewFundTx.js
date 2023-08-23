/*
* Logic
* 1) Get all users in fund
* 2) get all tx from users
* 3) render only tx for this fund
*/

import React, { useState, useEffect } from 'react'
import getFundData from '../../utils/getFundData'
import getUserData from '../../utils/getUserData'
import { EtherscanLink } from '../../config'
import { Select, Box, OrderedList, ListItem, Grid, GridItem, Text, SimpleGrid } from '@chakra-ui/react'
import Card from '../Card/Card'
import { fromWei } from 'web3-utils'
import { useParams } from 'react-router-dom'
import Footer from '../common/footer/Footer'

const ETH_TOKEN = String("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE").toLowerCase()

function ViewManager() {
    const { address } = useParams()
    console.log(address, "+++++++++++++++++++++SSSSSSSSSSSSSS");
    const [data, setData] = useState({
        funds: [],
        deposit: [],
        trade: [],
        withdraw: [],
    });
    const [showFundsTX, setShowFundsTX] = useState(true);
    const [showDepositTX, setShowDepositTX] = useState(true);
    const [showTradeTX, setShowTradeTX] = useState(true);
    const [showWithdrawTX, setShowWithdrawTX] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const getAllFundTxs = async () => {
            const data = await getFundData(address);
            const owner = data.result.owner;

            let users = []
            let _users = data.result.shares
            if (_users) {
                users = JSON.parse(_users)
                users = users.map((index) => index.user)
                users.push(owner)
                // Remove duplicete in case if owner of fund make deposit
                users = Array.from(new Set(users))
            }
            // In case if no shares
            else {
                users.push(owner)
            }

            let fund = [];
            let deposit = [];
            let withdarw = [];
            let trade = [];
            // get all txs
            for (let i = 0; i < users.length; i++) {
                const txData = await getUserData(users[i])

                if (JSON.parse(txData.data.result[0].data.funds) !== null)
                    fund.push([...JSON.parse(txData.data.result[0].data.funds)])

                if (JSON.parse(txData.data.result[0].data.withdraw) !== null)
                    withdarw.push([...JSON.parse(txData.data.result[0].data.withdraw)])

                if (JSON.parse(txData.data.result[0].data.deposit) !== null)
                    deposit.push([...JSON.parse(txData.data.result[0].data.deposit)])

                if (JSON.parse(txData.data.result[0].data.trade) !== null)
                    trade.push([...JSON.parse(txData.data.result[0].data.trade)])
            }


            if (isMounted) {
                setData({
                    funds: data.funds.flat(),
                    deposit: data.deposit.flat(),
                    trade: data.trade.flat(),
                    withdraw: data.withdraw.flat(),
                });
            }
        };

        getAllFundTxs();

        return () => {
            isMounted = false;
        };
    }, [address]);

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
            <Box>
                {
                    data && data.length > 0
                        ?
                        (
                            <Box>
                                {data.map((item, key) =>

                                    item.fund === address
                                        ?
                                        (
                                            <OrderedList key={item.transactionHash}>
                                                <ListItem>blockNumber: <a href={EtherscanLink + "/block/" + item.blockNumber} target="_blank" rel="noopener noreferrer">{item.blockNumber}</a></ListItem>
                                                <ListItem>Tx hash: <a href={EtherscanLink + "/tx/" + item.transactionHash} target="_blank" rel="noopener noreferrer">{item.transactionHash}</a></ListItem>
                                                <ListItem>Fund address: <a href={EtherscanLink + "/address/" + item.fund} target="_blank" rel="noopener noreferrer">{item.fund}</a></ListItem>
                                                {additionalData(item, stateName)}
                                            </OrderedList>
                                        )
                                        : (null)

                                )}
                            </Box>
                        )
                        :
                        (
                            <OrderedList>
                                <ListItem>no tx</ListItem>
                            </OrderedList>
                        )
                }
            </Box>
        )
    }

    const additionalData = (data, state) => {
        switch (state) {
            case 'funds':
                return (null)

            case 'deposit':
                return (
                    <Box>
                        <OrderedList>
                            <ListItem>Aditional data</ListItem>
                            <ListItem>Deposit amount: {fromWei(data.additionalData.amount)}</ListItem>
                            <ListItem>Total shares: {fromWei(data.additionalData.totalShares)} </ListItem>
                            <ListItem>Shares received: {fromWei(data.additionalData.sharesReceived)} </ListItem>
                        </OrderedList>
                    </Box>
                )

            case 'trade':
                return (
                    <Box>
                        <OrderedList>
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
                    </Box>
                )

            case 'withdraw':
                return (
                    <Box>
                        <OrderedList>
                            <ListItem>Aditional data</ListItem>
                            <ListItem>Shares removed: {fromWei(data.additionalData.sharesRemoved)} </ListItem>
                            <ListItem>Total shares: {fromWei(data.additionalData.totalShares)} </ListItem>
                        </OrderedList>
                    </Box>
                )

            default:
                return null
        }
    }
    return (
        <Box p={5}>
            <Grid mt={4} sx={{ textAlign: 'center', fontWeight: "500" }}>
                <GridItem style={{ borderRadius: "5px", padding: "10px 5px", boxShadow: "1px 1px 1px 1px gray", border: "1px solid white" }}>
                    DeFi investment funds - create or join the best smart funds on the blockchain
                </GridItem>
            </Grid>
            <Box mt={5}>
                <Card>
                    <Grid column={{ base: 1, md: 2 }} flexDirection={{ base: "column", md: "row" }} sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                        <GridItem>
                            <Select placeholder='Sorting tx'>
                                <option onClick={() => toggle("showFundsTX")}>{showFundsTX ? "Disable" : "Enable"} funds tx</option>
                                <option onClick={() => toggle("showDepositTX")}>{showDepositTX ? "Disable" : "Enable"} deposit tx</option>
                                <option onClick={() => toggle("showTradeTX")}>{showTradeTX ? "Disable" : "Enable"} trade tx</option>
                                <option onClick={() => toggle("showWithdrawTX")}>{showWithdrawTX ? "Disable" : "Enable"} withdraw tx</option>
                            </Select>
                        </GridItem>
                        <GridItem>
                            <strong style={{fontWeight:"500",}}>  All transactions for address : <small> <a style={{color:"#7500FF"}} href={EtherscanLink + "/address/" + address} target="_blank" rel="noopener noreferrer">{address}</a></small></strong>
                        </GridItem>
                    </Grid>
                </Card>
                <SimpleGrid columns={{base:1,md:2}} spacing={{base:5,md:10}}>
                    {
                        showFundsTX ?
                            (
                                    <Card style={{marginTop:"20px"}}>
                                        <Text sx={{fontWeight:"500",textTransform:"uppercase"}}>create fund tx</Text>
                                        {renderTx(data.funds, "funds")}
                                    </Card>
                            )
                            : (null)
                    }
                    {
                        showDepositTX ?
                            (
                                <Card style={{marginTop:"20px"}}>
                                    <Text sx={{fontWeight:"500",textTransform:"uppercase"}}>deposit tx</Text>
                                    {renderTx(data.deposit, "deposit")}
                                </Card>
                            )
                            : (null)
                    }

                    {
                        showTradeTX ?
                            (
                                <Card style={{marginTop:"20px"}}>
                                    <Text sx={{fontWeight:"500",textTransform:"uppercase"}}>trade tx</Text>
                                    {renderTx(data.trade, "trade")}
                                </Card>
                            )
                            : (null)
                    }
                    {
                        showWithdrawTX ?
                            (
                                <Card style={{marginTop:"20px"}}>
                                    <Text sx={{fontWeight:"500",textTransform:"uppercase"}}>withdarw tx</Text>
                                    {renderTx(data.withdraw, "withdraw")}

                                </Card>
                            )
                            : (null)
                    }
                </SimpleGrid>
                <Footer />
            </Box>

        </Box>
    )
}

export default ViewManager
