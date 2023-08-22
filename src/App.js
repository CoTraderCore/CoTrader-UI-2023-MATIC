import React, { useState, useEffect } from 'react';
import { ChakraProvider, } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {  Pages } from './utils/Pages';
import getWeb3 from './utils/getWeb3';
import themes from './Theme/Theme';
import ReactGA from 'react-ga'
import getFundsList from './utils/getFundsList';
// import { SmartFundRegistryADDRESS } from './config';
import Dashboard from './Pages/Dashboard';
import MainLayout from './Layouts/MainLayout';
import ViewFundWithoutWeb3 from './Pages/FundInfo/Index';

function App(props) {

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [isReactGarbagetytyweyety, setIsReactGarbagetytyweyety] = useState(false);
  const [network, setNetwork] = useState(0);
  const [isLoadNetID, setIsLoadNetID] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [isDataLoad, setIsDataLoad] = useState(false);
 
  useEffect(() => {
    initializeReactGA();
    
    setTimeout(() => {
      setTimeOut(true);
    }, 1000);

    async function fetchData() {
      try {
        const web3Instance = await getWeb3();
        const userAccounts = await web3Instance.eth.getAccounts();

        setWeb3(web3Instance);
        setAccounts(userAccounts);

        props.MobXStorage.initWeb3AndAccounts(web3Instance, userAccounts);
      } catch (error) {
        console.error(error);
      }

      initData();

      // Get network ID
      if (web3) {
        web3.eth.net.getId().then((netId) => {
          setNetwork(netId);
          setIsLoadNetID(true);
        });
      }

      if (window.ethereum) {
        window.ethereum.on('accountsChanged', () => window.location.reload());
      }
    }
    fetchData();
  }, [props.MobXStorage]);

  function initializeReactGA() {
    ReactGA.initialize('UA-141893089-1');
    ReactGA.pageview('/');
  }

  const initData = async () => {
    if (props.MobXStorage?.SmartFundsOriginal.length === 0) {
      const smartFunds = await getFundsList();
      props.MobXStorage.initSFList(smartFunds);
      // view current registry address
      // console.log("SmartFundRegistryADDRESS: ", SmartFundRegistryADDRESS, "!___version 28/04/21___!");
      setIsDataLoad(true);
    }
  };

  const router = createBrowserRouter([
    {
      path : Pages.SMARTFUNDLISTWITHOUTWEB3,
      element : <MainLayout />,
      children : [
        {
          path: Pages.SMARTFUNDLISTWITHOUTWEB3,
          element: <Dashboard {...props} web3={web3} isDataLoad={isDataLoad} setIsDataLoad={setIsDataLoad}/>
        },
        {
          path:Pages.VIEWFUNDWITHOUTWEB3 + '/:address',
          element:<ViewFundWithoutWeb3/>
        }
      ]
    },
   
  ]);
  return (
    <React.Fragment>
      <ChakraProvider className="App" theme={themes}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.Fragment>
  );
}

export default App;
