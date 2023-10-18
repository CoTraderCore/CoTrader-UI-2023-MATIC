import React, { useState, useEffect } from 'react';
import { ChakraProvider, } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
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
import { inject } from 'mobx-react'


const Web3Redirect = (props) => {
  const { timeOut, web3 } = props;
  const nevigate = useNavigate();
  useEffect(() => {
    if (timeOut)
      checkWeb3OffRedirect()
  }, [timeOut]);
  const checkWeb3OffRedirect = () => {
    if (timeOut && !web3) {
      const newPath = '/web3off/';
      nevigate(newPath)
    } else if (web3) {
      const oldpath = '/'
      nevigate(oldpath)
    }
  }
  return <React.Fragment>{props.children}</React.Fragment>
}

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

  const router = createBrowserRouter([
    {
      path: Pages.SMARTFUNDLIST,
      element: <Web3Redirect web3={web3} timeOut={timeOut}><MainLayout web3={web3} accounts={accounts} network={network} isLoadNetID={isLoadNetID} /></Web3Redirect>,
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
          loader:howtostartloader
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
