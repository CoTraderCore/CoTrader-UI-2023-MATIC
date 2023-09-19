import React, { useState, useEffect } from 'react';
import { ChakraProvider, } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';
import { Pages } from './utils/Pages';
import getWeb3 from './utils/getWeb3';
import themes from './Theme/Theme';
import ReactGA from 'react-ga'
import getFundsList from './utils/getFundsList';
import { SmartFundRegistryADDRESS } from './config';
import SmartFundListWithoutWeb3 from './Pages/ViewFundWithoutWeb3';
import MainLayout from './Layouts/MainLayout';
import ViewFundWithoutWeb3 from './Pages/FundInfoWithoutWeb3/Index';
import SmartFundList from './Pages/SmartFundList/Index';
import ViewFundTx from './Pages/ViewFundTx';
import ViewUserTx from './Pages/ViewUserTx'
import ViewFund from './Pages/ViewFund';
import ViewUser from './Pages/ViewUser';
import HowToStart from './Pages/HowToStart';
import { inject } from 'mobx-react'

function App(props) {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  // const [isReactGarbage, setIsReactGarbage] = useState(false);
  const [network, setNetwork] = useState(0);
  const [isLoadNetID, setIsLoadNetID] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [isDataLoad, setIsDataLoad] = useState(false);

  useEffect(() => {
    async function load() {
      initializeReactGA();
      setTimeout(() => {
        setTimeOut(true);
      }, 1000);

      await initData();
      await fetchData()
      // checkWeb3OffRedirect()

      if (web3) {
        web3.eth.net.getId().then(netId => {
          setNetwork(netId);
          setIsLoadNetID(true);
        });
      }

      if (window.ethereum) {
        window.ethereum.on('accountsChanged', () => window.location.reload());
      }
    }

    load()

  }, [props.MobXStorage, timeOut, web3]);


  const initializeReactGA = () => {
    ReactGA.initialize('UA-141893089-1');
    ReactGA.pageview('/');
  };

  const fetchData = async () => {
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
    if (props.MobXStorage.SmartFundsOriginal.length === 0) {
      try {
        const smartFunds = await getFundsList();
        props.MobXStorage.initSFList(smartFunds);
        console.log("SmartFundRegistryADDRESS: ", SmartFundRegistryADDRESS, "!___version 28/04/21___!");
        setIsDataLoad(true);
      } catch (error) {
        console.log("error:", error);
      }
    }
  };
  
  // const checkWeb3OffRedirect = () => {
  //   // Replace the path when the page is loaded for the first time
  //   const currentPath = window.location.pathname;
  //   if (currentPath === '/' && !web3) {
  //     const newPath = '/web3off/';
  //     const newURL = window.location.origin + newPath;
  //     window.history.replaceState({}, document.title, newURL);
  //   }
  // }


  const router = createBrowserRouter([
    {
      path: Pages.SMARTFUNDLIST,
      element: <MainLayout {...props} web3={web3} accounts={accounts} network={network} isLoadNetID={isLoadNetID} />,
      children: [
        {
          path: Pages.SMARTFUNDLIST,
          element: <SmartFundList {...props} web3={web3} accounts={accounts} isDataLoad={isDataLoad} setIsDataLoad={setIsDataLoad} />,
          exact: true
        },
        {
          path: Pages.SMARTFUNDLISTWITHOUTWEB3,
          element: <SmartFundListWithoutWeb3 {...props} web3={web3} isDataLoad={isDataLoad} setIsDataLoad={setIsDataLoad} />
        },
        {
          path: Pages.VIEWFUNDWITHOUTWEB3,
          element: <ViewFundWithoutWeb3 />
        },
        {
          path: Pages.VIEWFUNDTX,
          element: <ViewFundTx {...props} isDataLoad={isDataLoad} />
        },
        {
          path: Pages.VIEWUSERTX,
          element: <ViewUserTx {...props} isDataLoad={isDataLoad} />
        },
        {
          path: Pages.VIEWFUND,
          element: <ViewFund {...props} web3={web3} accounts={accounts} />
        },
        {
          path: Pages.VIEWUSER,
          element: <ViewUser {...props} />
        },
        {
          path: Pages.HOWTOSTART,
          element: <HowToStart {...props} />
        }
      ]
    },

  ]);
  return (
    <React.Fragment>
      <ChakraProvider theme={themes}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.Fragment>
  );
}

export default inject('MobXStorage')(App);
