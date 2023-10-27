import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Alert, 
  AlertIcon, 
  ChakraProvider, 
  Grid, 
  GridItem, 
  useColorMode, 
  useColorModeValue, 
  useDisclosure, 
  ColorModeProvider, 
  CSSReset, 
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
import { inject } from 'mobx-react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/common/Navbar';
import Sidebar from './Components/common/Sidebar';
import DashboardHeader from './Components/common/DashboardHeader';
import WalletInfo from './Components/common/WalletInfo';


function App(props) {
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(async () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => window.location.reload());
    }

    async function load() {
      initializeReactGA();
      initData();
    }
    load()
  }, []);


  const initializeReactGA = () => {
    ReactGA.initialize('UA-141893089-1');
    ReactGA.pageview('/');
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
              <Navbar toggleColorMode={toggleColorMode} web3={props.MobXStorage.web3} />
              <Grid sx={{ display: 'flex', flexWrap: "nowrap", overflow: "auto", height: "90vh", }} >
                <GridItem >
                  <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                </GridItem>
                <GridItem className='example' sx={{ flexGrow: 1, overflow: "auto", }}>
                  <Box pt={5} px={2}>
                    <DashboardHeader />
                  </Box>
                  <WalletInfo web3={props.MobXStorage.web3} accounts={props.MobXStorage.accounts} />
                  <Switch>
                    <Route exact path="/" render={() => <SmartFundList {...props} web3={props.MobXStorage.web3} accounts={accounts} isDataLoad={isDataLoad} setIsDataLoad={setIsDataLoad} />} />
                    <Route path="/fund/:address" render={(props) => <ViewFund {...props} web3={props.MobXStorage.web3} accounts={accounts} MobXStorage={props.MobXStorage} />} />
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
