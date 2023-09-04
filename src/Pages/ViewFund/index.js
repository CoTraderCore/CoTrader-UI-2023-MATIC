import React, { useEffect, useRef, useState } from 'react'
import ShadowBox from '../../Components/Cards/ShadowBox';
import IconBox from '../../Components/Icons/IconBox';
import Header from '../../Components/common/Header';
import { Box, Heading, Icon, SimpleGrid, Button, Tooltip, List, ListItem, Progress, Stack, useColorModeValue, GridItem, Grid, Table, Thead, Tr, Th, Td, Tbody, Text } from '@chakra-ui/react'
import { MdAttachMoney, } from "react-icons/md";
import Card from '../../Components/Card/Card';
import Footer from '../../Components/common/footer/Footer';
import getFundData from '../../utils/getFundData';
import { fromWei } from 'web3-utils';
import { EtherscanLink, APIEnpoint, NeworkID } from '../../config';
// import { NeworkID } from '../../config';
import EtherscanButton from '../../Components/actions/EtherscanButton';
import Loading from '../../Components/template/spiners/Loading';
import { useParams } from 'react-router-dom';
import MigrateToV9 from '../../Components/actions/MigrateToV9';
import PopupMsg from '../../Components/template/PopupMsg';
import { io } from 'socket.io-client';
import axios from 'axios';
import UserInfo from '../../Components/template/UserInfo';
import Deposit from '../../Components/actions/Deposit/Deposit';
import Withdraw from '../../Components/actions/Withdraw/Withdraw';
import UserHoldings from '../../Components/actions/UserHoldings';
import { fromWeiByDecimalsInput } from '../../utils/weiByDecimals';
import TradeModal from '../../Components/actions/TradeModal/TradeModal';
import InvestorsAlocationChart from '../../Components/Chart/InvestorsAlocationChart';
import AssetsAlocationChart from '../../Components/Chart/AssetsAlocationChart';
import WithdrawManager from '../../Components/actions/WithdrawManager';
import WhiteList from '../../Components/actions/WhiteList';
import UpdateUSDAsset from '../../Components/actions/UpdateUSDAsset';

function ViewFund(props) {
    const { address } = useParams();
    const _popupChild = useRef();
    const _isMounted = useRef(false);

    const [smartFundAddress, setSmartFundAddress] = useState('');
    const [name, setName] = useState('');
    const [balance, setBalance] = useState(null);
    const [owner, setOwner] = useState('');
    const [profitInETH, setProfitInETH] = useState('0');
    const [profitInUSD, setProfitInUSD] = useState('0');
    const [valueInETH, setValueInETH] = useState('0');
    const [valueInUSD, setValueInUSD] = useState('0');
    const [managerTotalCut, setManagerTotalCut] = useState('0');
    const [managerRemainingCut, setManagerRemainingCut] = useState('0');
    const [pending, setPending] = useState(false);
    const [popupMsg, setPopupMsg] = useState(false);
    const [isDataLoad, setIsDataLoad] = useState(false);
    const [txName, setTxName] = useState('');
    const [txHash, setTxHash] = useState('');
    const [lastHash, setLastHash] = useState('');
    const [shares, setShares] = useState([]);
    const [version, setVersion] = useState(0);
    const [txCount, setTxCount] = useState(0);
    const [mainAsset, setMainAsset] = useState('');
    const [fundSizeType, setFundSizeType] = useState('full');
    const [managerFee, setManagerFee] = useState(0);
    const [tradeVerification, setTradeVerification] = useState(1);

    useEffect(() => {
        _isMounted.current = true;
        loadData();
        initSocket();
        checkPending();

        return () => {
            _isMounted.current = false;
        };
    }, []);

    // init socket listener
    const initSocket = () => {
        const socket = io(APIEnpoint);
        socket.on('connect', () => {
            socket.on('Deposit', (address, hash) => {
                txUpdate('deposit', address, hash);
            });

            socket.on('Withdraw', (address, hash) => {
                txUpdate('withdraw', address, hash);
            });

            socket.on('Trade', (address, hash) => {
                txUpdate('trade', address, hash);
            });
        });
    };

    // helper for update by socket events
    const txUpdate = (txName, address, hash) => {
        if (address === address && lastHash !== hash) {
            if (_isMounted.current) {
                setLastHash(hash);
                setTxName(txName);
                setTxHash(hash);

                updateBalance();
                checkPending();

                if (_popupChild.current) {
                    showPopup();
                }
            }
        }
    };

    // get data from api
    const loadData = async () => {
        const fund = await getFundData(address);

        if (_isMounted.current) {
            setSmartFundAddress(fund.data.result.address);
            setName(fund.data.result.name);
            setBalance(JSON.parse(fund.data.result.balance));
            setOwner(fund.data.result.owner);
            setProfitInETH(fund.data.result.profitInETH);
            setProfitInUSD(fund.data.result.profitInUSD);
            setValueInETH(fund.data.result.valueInETH);
            setValueInUSD(fund.data.result.valueInUSD);
            setManagerTotalCut(fund.data.result.managerTotalCut);
            setManagerRemainingCut(fund.data.result.managerRemainingCut);
            setShares(fund.data.result.shares);
            setIsDataLoad(true);
            setVersion(Number(fund.data.result.version));
            setMainAsset(fund.data.result.mainAsset);
            setFundSizeType(fund.data.result.fundType);
            setManagerFee(fund.data.result.managerFee);
            setTradeVerification(fund.data.result.tradeVerification);
        }
    };
    // helper for update balance by socket event
    const updateBalance = async () => {
        const fund = await getFundData(address)

        if (this._isMounted) {
            setBalance(JSON.parse(fund.data.result.balance));
            setProfitInETH(fund.data.result.profitInETH);
            setProfitInUSD(fund.data.result.profitInUSD);
            setValueInETH(fund.data.result.valueInETH);
            setValueInUSD(fund.data.result.valueInUSD);
            setManagerTotalCut(fund.data.result.managerTotalCut);
            setManagerRemainingCut(fund.data.result.managerRemainingCut);

        }
    }
    // prop for components Deposit, Withdraw, Trade, FundManagerWinthdraw
    const Pending = (_bool, _txCount) => {
        setPending({ pending: _bool, txCount: _txCount })
    }
    // check if there are no more transactions hide peding info
    const checkPending = async () => {
        if (props.accounts) {
            let txCount = await axios.get(APIEnpoint + 'api/user-pending-count/' + props.accounts[0])
            txCount = txCount.data.result

            const pending = Number(txCount) === 0 ? false : true
            if (_isMounted)
                setPending({ pending, txCount })
        }
    }
    // helper for parse pool connectors data
    const parsePoolConnectors = (data) => {
        const poolConnectors = data.map((item) => item.symbol)
        return (
            <UserInfo info={`Pool tokens : ${poolConnectors}`} />
        )
    }
    // show toast info
    function showPopup() {
        if (this._popupChild.current)
            this._popupChild.current.show()
    }


    // const brandColor = useColorModeValue("#422AFB", "##CBC3E3");
    // const boxBg = useColorModeValue("#F4F7FE", "#110938");
    const tooltipBg = useColorModeValue("black", "#A4ADC7")
    const headingColor = useColorModeValue("#1B2559", "#F4F7FE");
    const totalprogressBg = useColorModeValue("green.100", "#CBC3E3")
    const colorSchemeGreen = useColorModeValue("green", "green")
    const colorSchemeRed = useColorModeValue("red", "red")
    const remainingprogressBg = useColorModeValue("red.100", "#CBC3E3")
    const allbtnBg = useColorModeValue("#30106b", "#7500FF")
    const tableHead = useColorModeValue("#1A202C", "#fff")
    const chartbg = useColorModeValue("#fff", "#181144")

    return (
        <React.Fragment>
            <MigrateToV9
                version={version}
                owner={owner}
                web3={props.web3}
                accounts={props.accounts}
                smartFundAddress={smartFundAddress}
            />

            <Box>
                <PopupMsg txName={txName} txHash={txHash} ref={_popupChild} />
                {
                    pending ? (
                        <>
                            <Box>
                                <small>Pending transition : {txCount}</small>
                            </Box>
                            <Pending />
                        </>
                    ) : (
                        null
                    )
                }
            </Box>

            <Box p={4} background="" >
                <Header heading="Fund Detail" />
                <GridItem style={{ textAlign: "center", fontWeight: "500", borderRadius: "5px", padding: "10px 5px", boxShadow: "1px 1px 1px 1px gray", border: "1px solid white" }}>
                    DeFi investment funds - create or join the best smart funds on the blockchain
                </GridItem>
                <Box mt={4} sx={{ padding: "10px", borderRadius: "10px", }}>
                    <Heading textTransform={"uppercase"} fontSize={{ base: "2xl" }} color={headingColor} textAlign={'center'} p={2}>Fund Name: {name}</Heading>
                    <SimpleGrid
                        width="100%"
                        columns={{ base: 1, md: 3, lg: 5, }}
                        gap='20px'
                        mb='20px'>
                        <ShadowBox
                            name='Type'
                            value={fundSizeType}
                            shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                        />
                        <ShadowBox
                            name='Core asset'
                            value={mainAsset}
                            shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                        />
                        <ShadowBox
                            name='Version'
                            value={String(version)}
                            shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                        />
                        <ShadowBox
                            name='Manager fee'
                            value={Number(managerFee / 100).toFixed(2) + "%"}
                            shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                        />
                        <ShadowBox
                            name='Limit tokens'
                            value={Number(tradeVerification) === 1 ? "enable" : "disabled"}
                            shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                        />
                    </SimpleGrid>
                </Box>
                {/*  <SimpleGrid
                    pt={5}
                    width="100%"
                    columns={{ base: 1, md: 2, lg: 4, }}
                    gap='20px'
                    mb='20px'>
                    <ShadowBox
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                                }
                            />
                        }
                        name='Fund profit in BNB'
                        value={props.web3.utils.fromWei(String(profitInETH))}
                    />
                    <ShadowBox
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                                }
                            />
                        }
                        name='Fund profit in USD'
                        value={props.web3.utils.fromWei(String(profitInUSD))}
                    />
                    <ShadowBox
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={<Icon w='28px' h='28px' as={MdAttachMoney} color={brandColor} />}
                            />
                        }
                        name='Fund value in BNB'
                        value={props.web3.utils.fromWei(String(valueInETH))}
                    />
                    <ShadowBox
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={<Icon w='28px' h='28px' as={MdAttachMoney} color={brandColor} />}
                            />
                        }
                        name='Fund value in USD'
                        value={props.web3.utils.fromWei(String(valueInUSD))}
                    />
                    </SimpleGrid> */}
                <Box>
                    <Heading fontSize={{ base: "xl", md: "2xl" }} sx={{ textAlign: "center", textTransform: "uppercase", color: { headingColor }, padding: "10px 0px" }}>Investor actions</Heading>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box justifyContent="center" gap={5} sx={{ display: "flex", flexDirection: { base: "column", sm: "column", md: "row" }, width: { base: "100%", md: "70%", lg: "70%" } }}>
                            <Deposit
                                web3={props.web3}
                                address={smartFundAddress}
                                accounts={props.accounts}
                                mainAsset={mainAsset}
                                pending={pending}
                                version={version}
                            />
                            <Withdraw
                                web3={props.web3}
                                address={smartFundAddress}
                                accounts={props.accounts}
                                version={version}
                                mainAsset={mainAsset}
                                pending={pending}
                            />
                            <UserHoldings
                                web3={props.web3}
                                address={smartFundAddress}
                                accounts={props.accounts}
                                pending={pending}
                            />
                            <EtherscanButton address={smartFundAddress} />
                        </Box>
                    </Box>
                </Box>
                <Box mt={5} borderRadius="20px" bg={chartbg}>
                    <SimpleGrid columns={{ base: 1, md: 2 }}>
                        {
                            shares ? (
                                <GridItem>
                                    <InvestorsAlocationChart Data={shares} />
                                </GridItem>
                            ) : null
                        }
                        {
                            NeworkID === 56 && balance ?
                                (
                                    <GridItem>
                                        <AssetsAlocationChart AssetsData={balance} version={version} />
                                    </GridItem>
                                ) : null
                        }

                    </SimpleGrid>

                </Box>
                <Box>
                    <Box mt={5} gap={4} width={"100%"} sx={{ display: "flex", flexDirection: { base: "column", md: "row" }, }} >
                        <Card width={{ base: "100%", md: "30%" }} bg={"rgba(128, 144, 255,.1)"}>
                            <Heading fontSize={{ base: "xl", md: "2xl" }} sx={{ textAlign: "center", textTransform: "uppercase", color: { headingColor }, padding: "10px 0px" }}>MANAGER INFO</Heading>
                            <List p={5} width={{ base: "100%", md: "100%" }} textAlign={'center'} borderRadius={"10px"}>
                                <ListItem py={4}>
                                    <span style={{ color: { headingColor }, fontWeight: "600" }}> Total Cut: {fromWei(managerTotalCut, 'ether')}</span>
                                    <Stack spacing={5}>
                                        <Progress bg={totalprogressBg} colorScheme={colorSchemeGreen} size='md' value={fromWei(managerTotalCut, 'ether')} sx={{ borderRadius: "20px" }} />
                                    </Stack>
                                </ListItem>
                                <ListItem py={4}>
                                    <span style={{ color: { headingColor }, fontWeight: "600" }}> Remaining Cut: {fromWei(managerRemainingCut, 'ether')}</span>
                                    <Stack spacing={5} >
                                        <Progress bg={remainingprogressBg} colorScheme={colorSchemeRed} size='md' value={fromWei(managerRemainingCut, 'ether')} sx={{ borderRadius: "20px" }} />
                                    </Stack>
                                </ListItem>
                            </List>
                        </Card>

                        <Card width={{ base: "100%", md: "70%" }} >
                            <Box sx={{ display: "flex", flexDirection: { base: "column", md: "row" } }}>
                                <Box className='table-box' width="100%">
                                    <Heading fontSize="xl" color={tableHead}>Fund balance</Heading>
                                    <Table striped bordered hover style={{
                                        textAlign: "left"
                                    }}>

                                        <Thead style={{ "color": "grey" }}>
                                            <Tr>
                                                <Th>Token</Th>
                                                <Th>% from fund</Th>
                                                <Th>Value in BNB</Th>
                                                <Th>Balance</Th>
                                            </Tr>
                                        </Thead>
                                        {
                                            balance ?
                                                (
                                                    <Tbody style={{ "color": "grey" }}>
                                                        {
                                                            balance.slice().sort(function (a, b) {
                                                                return Number(b.percentInETH) - Number(a.percentInETH)
                                                            }).map((item, key) => {
                                                                if (item["percentInETH"] > 0) {
                                                                    return (
                                                                        <Tr key={key}>
                                                                            <Td className='table-row'>
                                                                                {
                                                                                    <img
                                                                                        style={{ height: "20px", width: "20px" }}
                                                                                        src={`https://tokens.1inch.exchange/${String(item["address"]).toLowerCase()}.png`}
                                                                                        alt="Logo"
                                                                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://etherscan.io/images/main/empty-token.png" }} />
                                                                                }
                                                                                &nbsp;
                                                                                {<a href={EtherscanLink + "token/" + item["address"]} target="_blank" rel="noopener noreferrer">{item["symbol"]}</a>}
                                                                                &nbsp;
                                                                                {
                                                                                    item["tokensAdditionalData"].length > 0
                                                                                        ?
                                                                                        (
                                                                                            <>
                                                                                                {this.parsePoolConnectors(item["tokensAdditionalData"])}
                                                                                            </>
                                                                                        ) : null
                                                                                }
                                                                            </Td>

                                                                            <Td>
                                                                                {item["percentInETH"] > 0 ? Number(item["percentInETH"]).toFixed(4) : 0} %
                                                                            </Td>

                                                                            <Td>
                                                                                {item["assetValueInETHFromWei"] > 0 ? Number(item["assetValueInETHFromWei"]).toFixed(6) : 0}
                                                                            </Td>

                                                                            <Td>
                                                                                {Number(fromWeiByDecimalsInput(item["decimals"], item["balance"].toString())).toFixed(4)}
                                                                            </Td>
                                                                        </Tr>
                                                                    )
                                                                }
                                                                else {
                                                                    return null
                                                                }
                                                            }
                                                            )
                                                        }
                                                    </Tbody>
                                                )
                                                :
                                                (
                                                    <Text>No assets in this fund</Text>
                                                )
                                        }
                                    </Table>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                </Box>
                <Box pt={5}>
                    <Heading fontSize={{ base: "xl", md: "2xl" }} sx={{ textAlign: "center", textTransform: "uppercase", color: { headingColor }, padding: "10px 0px" }}>Manager actions</Heading>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box justifyContent="center" gap={5} sx={{ display: "flex", flexDirection: { base: "column", sm: "column", md: "row" }, width: { base: "100%", md: "70%", lg: "70%" } }}>
                            {/* <TradeModal
                                web3={props.web3}
                                accounts={props.accounts}
                                smartFundAddress={smartFundAddress}
                                pending={pending}
                                version={version}
                                    /> */}
                            <WithdrawManager
                                web3={props.web3}
                                accounts={props.accounts}
                                smartFundAddress={smartFundAddress}
                                owner={owner}
                                pending={pending}
                                version={version}
                            />
                            <WhiteList
                                web3={props.web3}
                                accounts={props.accounts}
                                smartFundAddress={smartFundAddress}
                                owner={owner}
                            />
                            <UpdateUSDAsset
                            web3={props.web3}
                            accounts={props.accounts}
                            smartFundAddress={smartFundAddress}
                            version={version}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box justifyContent="center" gap={5} sx={{ display: "flex", flexDirection: { base: "column", sm: "column", md: "row" }, width: { base: "100%", md: "70%", lg: "70%" } }}>
                            <Tooltip hasArrow label="You can't use this button because You are not owner of this smart fund" bg={tooltipBg}>
                                <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                    Exchange
                                </Button>
                            </Tooltip>
                            <Tooltip hasArrow label="You can't use this button because You are not owner of this smart fund" bg={tooltipBg}>
                                <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                    Take Cut
                                </Button>
                            </Tooltip>
                            <Tooltip hasArrow label="You can't use this button because You are not owner of this smart fund" bg={tooltipBg}>
                                <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                    White List
                                </Button>
                            </Tooltip>
                            {
                                mainAsset === "USD" ?
                                    (
                                        <Tooltip hasArrow label="You can't use this button because You are not owner of this smart fund" bg={tooltipBg}>
                                            <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                                Stable Tokens
                                            </Button>
                                        </Tooltip>
                                    ) : null
                            }
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Card mt={5}>
                        <Grid sx={{ display: "flex", justifyContent: "space-around", }} flexDirection={{ base: "column", md: "row" }} gap={{ base: "20px", md: "0" }}>
                            <GridItem fontWeight={600} >

                                Smart Fund: <a style={{ color: "#5E39FF", fontWeight: "500", }} href={EtherscanLink + "address/" + smartFundAddress} target="_blank" rel="noopener noreferrer">{String(smartFundAddress).replace(String(smartFundAddress).substring(6, 36), "...")}</a>
                            </GridItem>
                            <GridItem fontWeight={600}>
                                Owner: <a style={{ color: "#5E39FF", fontWeight: "500" }} href={EtherscanLink + "address/" + owner} target="_blank" rel="noopener noreferrer">{String(owner).replace(String(owner).substring(6, 36), "...")}</a>
                            </GridItem>
                        </Grid>
                    </Card>
                </Box>
                <Footer />
            </Box>


        </React.Fragment>
    )
}

export default ViewFund;
