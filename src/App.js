import React, { useState, useEffect } from 'react';
import {
  Box,
  ChakraProvider,
  Grid,
  GridItem,
  useColorMode,
  useDisclosure,
  ColorModeProvider,
  CSSReset,
  Text,
  Alert
} from '@chakra-ui/react';
import themes from './Theme/Theme';
import ReactGA from 'react-ga';
import getFundsList from './utils/getFundsList';
import SmartFundList from './Pages/SmartFundList/Index';
import ViewFundTx from './Pages/ViewFundTx';
import ViewUserTx from './Pages/ViewUserTx';
import ViewFund from './Pages/ViewFund';
import ViewUser from './Pages/ViewUser';
import HowToStart from './Pages/HowToStart';
import { inject,observer } from 'mobx-react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/common/Navbar';
import Sidebar from './Components/common/Sidebar';
import DashboardHeader from './Components/common/DashboardHeader';
import WalletInfo from './Components/common/WalletInfo';
import getWeb3 from './utils/getWeb3';
import { NeworkID } from './config';
// import Web3Alert from './Components/Web3Off/Web3Alert'

function App(props) {
  const [isDataLoad, setIsDataLoad] = useState(false);

  useEffect(async () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => window.location.reload());
    }

    async function load() {
      initializeReactGA();
      initData();
    }
    load()
  }, [props.MobXStorage]);


  const initializeReactGA = () => {
    ReactGA.initialize('UA-141893089-1');
    ReactGA.pageview('/');
  };

  const initData = async () => {
    if (props.MobXStorage.SmartFundsOriginal.length === 0) {
      try {
        const smartFunds = await getFundsList();
        props.MobXStorage.initSFList(smartFunds);
        setIsDataLoad(true);
      } catch (error) {
        console.log("error:", error);
      }
    }
  };
  const connectWallet = async (mobx) => {
    await getWeb3().then(async (response) => {
      const _web3 = response
      const _netId = Number(await response.eth.net.getId())
      const _accounts = response.eth.getAccounts()
      mobx.initWeb3AndAccounts(_web3, _accounts, _netId)
    });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  return (
    <React.Fragment>
      <HashRouter>
        <ChakraProvider theme={themes}>
          <ColorModeProvider>
            <CSSReset />
            <Box
              sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                position: "relative"
              }}
            >
              <Navbar toggleColorMode={toggleColorMode} connectWallet={connectWallet} />
              <Grid sx={{ display: 'flex', flexWrap: "nowrap", overflow: "auto", height: "90vh", }} >
                <GridItem >
                  <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                </GridItem>
                <GridItem className='example' sx={{ flexGrow: 1, overflow: "auto", }}>
                  <Box pt={5} px={2}>
                    <DashboardHeader />
                  </Box>
                  {
                    props.MobXStorage.netId && NeworkID !== props.MobXStorage.netId
                      ?
                      (
                        <Alert mt={2} status="error" sx={{ color: "red", fontSize: "sm" }}>ERROR: WRONG NETWORK</Alert>
                      )
                      : null
                  }
                  <WalletInfo web3={props.MobXStorage.web3} accounts={props.MobXStorage.accounts} />
                  <Switch>
                    <Route exact path="/" render={() => <SmartFundList web3={props.MobXStorage.web3} accounts={props.MobXStorage.account} MobXStorage={props.MobXStorage} isDataLoad={isDataLoad} setIsDataLoad={setIsDataLoad} />} />
                    <Route path="/fund/:address" render={() => <ViewFund web3={props.MobXStorage.web3} accounts={props.MobXStorage.account} MobXStorage={props.MobXStorage}/>} />
                    <Route path="/user-txs/:address" render={() => <ViewUserTx MobXStorage={props.MobXStorage} isDataLoad={isDataLoad} />} />
                    <Route path="/fund-txs/:address" render={() => <ViewFundTx MobXStorage={props.props.MobXStorage} isDataLoad={isDataLoad} />} />
                    <Route path="/user/:address" render={() => <ViewUser MobXStorage={props.MobXStorage} />} />
                    <Route path="/how-to-start" render={() => <HowToStart MobXStorage={props.MobXStorage} />} />
                  </Switch>
                </GridItem>
              </Grid>
            </Box>
          </ColorModeProvider>
        </ChakraProvider>
      </HashRouter>
    </React.Fragment>
  );
}

export default inject('MobXStorage')(App);
