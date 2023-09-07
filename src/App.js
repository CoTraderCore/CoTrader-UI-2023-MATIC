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
import MobXStorage from './MobXStorage';
import ViewFundTx from './Pages/ViewFundTx';
import ViewUserTx from './Pages/ViewUserTx'
import ViewFund from './Pages/ViewFund';
import ViewUser from './Pages/ViewUser';
import HowToStart from './Pages/HowToStart';



function App(props) {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  // const [isReactGarbage, setIsReactGarbage] = useState(false);
  const [network, setNetwork] = useState(0);
  const [isLoadNetID, setIsLoadNetID] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [isDataLoad, setIsDataLoad] = useState(false);

  let isMounted = false
  useEffect(() => {
    isMounted = true
    initializeReactGA();
    setTimeout(() => {
      setTimeOut(true);
    }, 1000);

    if (web3) {
      web3.eth.net.getId().then(netId => {
        setNetwork(netId);
        setIsLoadNetID(true);
      });
    }

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => window.location.reload());
    }
    initWeb3();
    initData();
    checkWeb3OffRedirect();

    return () => {
      //component unmount
      isMounted = false
    };

  }, [web3]);
   

  const initializeReactGA = () => {
    ReactGA.initialize('UA-141893089-1');
    ReactGA.pageview('/');
  };


  const initWeb3 = async () => {
    try {
      const web3Instance = await getWeb3();
      const userAccounts = await web3Instance.eth.getAccounts();

      setWeb3(web3Instance);
      setAccounts(userAccounts);
      this.props.MobXStorage.initWeb3AndAccounts(web3Instance, userAccounts); // You may need to adapt this part
    } catch (error) {
      console.error("fetching error", error);
    }
  };

  const initData = async () => {
    if (isMounted && MobXStorage.SmartFundsOriginal.length === 0) {
      try {
        const smartFunds = await getFundsList();
        MobXStorage.initSFList(smartFunds);
        console.log("SmartFundRegistryADDRESS: ", SmartFundRegistryADDRESS, "!___version 28/04/21___!");
        setIsDataLoad(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const checkWeb3OffRedirect = () => {
    if (timeOut && !web3) {
      const redirectOff = ['web3off', 'how-to-start', 'user-txs', 'fund-txs', 'user'];
      const isIncludes = redirectOff.some(el => window.location.href.includes(el));

      if (!isIncludes) {
        const web3offAddress = window.location.href.replace('#/', '#/web3off/');
        console.log(web3offAddress);
        window.location = web3offAddress;
      }
    }
  };


  const router = createBrowserRouter([
    {
      path: Pages.SMARTFUNDLIST,
      element: <MainLayout {...props} web3={web3} accounts={accounts} network={network} isLoadNetID={isLoadNetID} />,
      children: [
        {
          path: Pages.SMARTFUNDLIST,
          element: <SmartFundList {...props} web3={web3} accounts={accounts} isDataLoad={isDataLoad} setIsDataLoad={setIsDataLoad} />,
        },
        {
          path: Pages.SMARTFUNDLISTWITHOUTWEB3,
          element: <SmartFundListWithoutWeb3 {...props} web3={web3} isDataLoad={isDataLoad} setIsDataLoad={setIsDataLoad} />
        },
        {
          path: Pages.VIEWFUNDWITHOUTWEB3 + '/:address',
          element: <ViewFundWithoutWeb3 />
        },
        {
          path: Pages.VIEWFUNDTX + '/:address',
          element: <ViewFundTx {...props} isDataLoad={isDataLoad} />
        },
        {
          path: Pages.VIEWUSERTX + '/:address',
          element: <ViewUserTx {...props} isDataLoad={isDataLoad} />
        },
        {
          path: Pages.VIEWFUND + '/:address',
          element: <ViewFund {...props} web3={web3} accounts={accounts} />
        },
        {
          path: Pages.VIEWUSER + '/:address',
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

export default App;
