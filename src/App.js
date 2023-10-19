import React, { useState, useEffect } from 'react';
import { ChakraProvider, } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Pages } from './utils/Pages';
import getWeb3 from './utils/getWeb3';
import themes from './Theme/Theme';
import ReactGA from 'react-ga'
import getFundsList from './utils/getFundsList';
import MainLayout, { rootloader } from './Layouts/MainLayout';
import SmartFundListWithoutWeb3, { eventloader as smartfundwithoutloader } from './Pages/SmartFundWithoutWeb3';
import ViewFundWithoutWeb3, { eventloader as fundinfoloader } from './Pages/FundInfoWithoutWeb3/Index';
import SmartFundList, { eventloader as smartfundloader } from './Pages/SmartFundList/Index';
import ViewFundTx, { eventloader as viewfunttxloader } from './Pages/ViewFundTx';
import ViewUserTx, { eventloader as viewusertxloader } from './Pages/ViewUserTx';
import ViewFund, { eventloader as viewfundloader } from './Pages/ViewFund';
import ViewUser, { eventloader as viewuserloader } from './Pages/ViewUser';
import HowToStart, { eventloader as howtostartloader } from './Pages/HowToStart';
import { inject } from 'mobx-react';

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
          setNetwork(netId);
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
     // Redirect to web3off version if the client has no web3
    if (timeOut && !web3) {
       // if current location web3off, how-to-start no need redirect to web3 off
      const newPath = ['web3off', 'how-to-start', 'user-txs', 'fund-txs', 'user'];
      const currentPath = window.location.pathname;
  
      if (!newPath.some(el => currentPath.includes(el))) {
        window.location.href = `/web3off/`;
      }
    }
  };
  

  const router = createBrowserRouter([
    {
      path: Pages.SMARTFUNDLIST,
      element: <MainLayout web3={web3} accounts={accounts} network={network} isLoadNetID={isLoadNetID} />,
      loader: rootloader,
      children: [
        {
          path: Pages.SMARTFUNDLIST,
          element: <SmartFundList {...props} web3={web3} accounts={accounts} isDataLoad={isDataLoad} setIsDataLoad={setIsDataLoad} />,
          loader: smartfundloader,
        },
        {
          path: Pages.SMARTFUNDLISTWITHOUTWEB3,
          element: <SmartFundListWithoutWeb3 {...props} web3={web3} isDataLoad={isDataLoad} setIsDataLoad={setIsDataLoad} />,
          loader: smartfundwithoutloader
        },
        {
          path: Pages.VIEWFUNDWITHOUTWEB3,
          element: <ViewFundWithoutWeb3 {...props} web3={web3} accounts={accounts} />,
          loader: fundinfoloader
        },
        {
          path: Pages.VIEWFUNDTX,
          element: <ViewFundTx {...props} isDataLoad={isDataLoad} />,
          loader: viewfunttxloader
        },
        {
          path: Pages.VIEWUSERTX,
          element: <ViewUserTx {...props} isDataLoad={isDataLoad} />,
          loader: viewusertxloader
        },
        {
          path: Pages.VIEWFUND,
          element: <ViewFund {...props} web3={web3} accounts={accounts} MobXStorage={props.MobXStorage} />,
          loader: viewfundloader
        },
        {
          path: Pages.VIEWUSER,
          element: <ViewUser {...props} />,
          loader: viewuserloader
        },
        {
          path: Pages.HOWTOSTART,
          element: <HowToStart {...props} />,
          loader: howtostartloader
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
