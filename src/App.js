import React, { useState, useEffect } from 'react';
import { Box, Alert, AlertIcon, ChakraProvider, Grid, GridItem, useColorMode, useColorModeValue, useDisclosure, ColorModeProvider, CSSReset, } from '@chakra-ui/react';
import getWeb3 from './utils/getWeb3';
import themes from './Theme/Theme';
import ReactGA from 'react-ga';
import getFundsList from './utils/getFundsList';
import SmartFundListWithoutWeb3 from './Pages/SmartFundWithoutWeb3';
import ViewFundWithoutWeb3 from './Pages/FundInfoWithoutWeb3/Index';
import SmartFundList from './Pages/SmartFundList/Index';
import ViewFundTx from './Pages/ViewFundTx';
import ViewUserTx from './Pages/ViewUserTx';
import ViewFund from './Pages/ViewFund';
import ViewUser from './Pages/ViewUser';
import HowToStart from './Pages/HowToStart';
import { inject } from 'mobx-react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { NeworkID } from './config';
import Navbar from './Components/common/Navbar';
import Sidebar from './Components/common/Sidebar';
import DashboardHeader from './Components/common/DashboardHeader';
import WalletInfo from './Components/common/WalletInfo';


function App(props) {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  // const [isReactGarbage, setIsReactGarbage] = useState(false);
  const [network, setNetwork] = useState(0);
  const [isLoadNetID, setIsLoadNetID] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [isDataLoad, setIsDataLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimeOut(true);
    }, 1000);

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => window.location.reload());
    }

    async function load() {
      initializeReactGA();
      initData();
      fetchWeb3()
      if (web3) {
        web3.eth.net.getId().then(netId => {
          setNetwork(Number(netId));
          setIsLoadNetID(true);
        });
      }
    }
    load()
  }, [web3]);

  useEffect(() => {
    web3redirect()
  }, [timeOut])

  const initializeReactGA = () => {
    ReactGA.initialize('UA-141893089-1');
    ReactGA.pageview('/');
  };
  const fetchWeb3 = async () => {
    console.log("Test")
    try {
      // Get network provider and web3 instance.
      const web3Instance = await getWeb3();
      // Use web3 to get the user's accounts.
      const userAccounts = await web3Instance.eth.getAccounts();
      console.log("userAccounts", userAccounts)
      // Set web3 and accounts to the state
      setWeb3(web3Instance);
      setAccounts(userAccounts);
      props.MobXStorage.initWeb3AndAccounts(web3Instance, userAccounts);
    } catch (error) {
      // Catch any errors for any of the above operations.
      // alert(
      //   `Failed to load web3, accounts, or contract. Check console for details.`,
      // )
      console.log('Fetching error', error);
    }
  };
  const initData = async () => {
    if (props.MobXStorage?.SmartFundsOriginal.length === 0) {
      try {
        const smartFunds = await getFundsList();
        props.MobXStorage.initSFList(smartFunds);
        setIsDataLoad(true);
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

  const web3redirect = () => {
    // redirect to web3off version if client has no web3
    if (timeOut && !web3) {
      // if current location web3off, how-to-start no need redirect to web3 off
      const redirectOff = ['web3off', 'how-to-start', 'user-txs', 'fund-txs', 'user']
      const isIncludes = redirectOff.some((el) => String(window.location.href).includes(el))

      if (!isIncludes) {
        // replace current address with web3 off
        const web3offAddress = String(window.location.href).replace('#/', '#/web3off/')
        console.log(web3offAddress)
        window.location = web3offAddress
      }
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const bgm = useColorModeValue("#F3F6FD", "#110938");

  return (
    <>
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
              <Navbar toggleColorMode={toggleColorMode} web3={web3} />
              <Grid sx={{ display: 'flex', flexWrap: "nowrap", overflow: "auto", height: "90vh", }} >
                <GridItem >
                  <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                </GridItem>
                <GridItem className='example' sx={{ flexGrow: 1, overflow: "auto", }}>
                  <Box pt={5} px={2}>
                    <DashboardHeader />
                  </Box>
                  <WalletInfo web3={web3} accounts={accounts} />
                  {
                    NeworkID !== network && isLoadNetID && web3 ?
                      (
                        <Alert status='error' fontWeight={'500'}>
                          <AlertIcon />
                          Wrong network ID
                        </Alert>
                      ) :
                      (
                        null
                      )
                  }
                  <Switch>
                    <Route path="/web3off/fund/:address" render={() => <ViewFundWithoutWeb3 {...props} web3={web3} accounts={accounts} />} />
                    <Route exact path="/" render={() => <SmartFundList {...props} web3={web3} accounts={accounts} isDataLoad={isDataLoad} setIsDataLoad={setIsDataLoad} />} />
                    <Route path="/web3off" render={() => <SmartFundListWithoutWeb3 {...props} web3={web3} isDataLoad={isDataLoad} setIsDataLoad={setIsDataLoad} />} />
                    <Route path="/fund/:address" render={(props) => <ViewFund {...props} web3={web3} accounts={accounts} MobXStorage={props.MobXStorage} />} />
                    <Route path="/user-txs/:address" render={(props) => <ViewUserTx {...props} isDataLoad={isDataLoad} />} />
                    <Route path="/fund-txs/:address" render={(props) => <ViewFundTx {...props} isDataLoad={isDataLoad} />} />
                    <Route path="/user/:address" render={(props) => <ViewUser {...props} />} />
                    <Route path="/how-to-start" render={(props) => <HowToStart {...props} />} />
                  </Switch>
                </GridItem>
              </Grid>
            </Box>
          </ColorModeProvider>
        </ChakraProvider>
      </HashRouter>
    </>
  );
}

export default inject('MobXStorage')(App);
