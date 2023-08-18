import React, { useState, useEffect } from 'react';
import { ChakraProvider, } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import About from './Pages/About/Index';
import StackCot from './Pages/Stack/Index';
import Buy from './Pages/Buy/Index';
import Telegram from './Pages/Telegram/Index';
import Twitter from './Pages/Twitter/Index';
import DashboardLayout from './Layouts/DashboardLayout';
import { DashboardPages } from './utils/Pages';
import getWeb3 from './utils/getWeb3';
import themes from './Theme/Theme';
import ReactGA from 'react-ga'
import getFundsList from './utils/getFundsList';
import { SmartFundRegistryADDRESS } from './config';
// card color  #181144
// background color #110938
function App(props) {

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [isReactGarbagetytyweyety, setIsReactGarbagetytyweyety] = useState(false);
  const [network, setNetwork] = useState(0);
  const [isLoadNetID, setIsLoadNetID] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [isDataLoad, setIsDataLoad] = useState(false);
  // const [themeType, setThemeType] = useState('light');
  console.log(web3,"GOPIGPGOSPDFGFAGGDSA");

  useEffect(() => {
    document.body.classList.add('light_theme');
    document.body.classList.add('fullWidth_container');
    initializeReactGA();
    // Time for checking web3 status
    setTimeout(() => {
      setTimeOut(true);
    }, 1000);

    async function fetchData() {
      try {
        // Get network provider and web3 instance.
        const web3Instance = await getWeb3();

        // Use web3 to get the user's accounts.
        const userAccounts = await web3Instance.eth.getAccounts();

        // Set web3 and accounts to the state, and then proceed with an
        // example of interacting with the contract's methods.
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

      // reload app if account was changed
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', () => window.location.reload());
      }
    }

    fetchData();

    // return () => {
    //   // Cleanup function
    //   // You may want to cancel any ongoing requests or subscriptions here
    //   // Set isMounted to false to prevent state updates after unmounting
    //   setIsMounted(false);
    // };
  }, []);

  // useEffect(() => {
  //   if (themeType === 'dark') {
  //     document.body.classList.add('dark_theme');
  //     document.body.classList.remove('light_theme');
  //   } else {
  //     document.body.classList.add('light_theme');
  //     document.body.classList.remove('dark_theme');
  //   }
  // }, [themeType]);

  function initializeReactGA() {
    ReactGA.initialize('UA-141893089-1');
    ReactGA.pageview('/');
  }

  const initData = async () => {
    if (props.MobXStorage?.SmartFundsOriginal.length === 0) {
      const smartFunds = await getFundsList();
      props.MobXStorage.initSFList(smartFunds);
      // view current registry address
      console.log("SmartFundRegistryADDRESS: ", SmartFundRegistryADDRESS, "!___version 28/04/21___!");
      setIsDataLoad(true);
    }
  };


  // const [web3, setWeb3] = useState(null);
  // const [network, setNetwork] = useState(0);
  // const [isLoadNetID, setIsLoadNetID] = useState(false)
  // const [accounts, setAccounts] = useState(null)
  // const [isDataLoad, setIsDataLoad] = useState(false)
  // const [timeOut, setTimeOut] = useState(false);

  // useEffect(() => {
  //   if (web3) {
  //     web3.eth.net.getId().then(netId => {
  //       setNetwork(netId);
  //       setIsLoadNetID(true);
  //     });
  //   }

  // }, [])



  // const initializeReactGA = () => {
  //   ReactGA.initialize('UA-141893089-1');
  //   ReactGA.pageview('/');
  // }

  // useEffect(() => {
  //   let isMounted = true;

  //   initializeReactGA();

  //   // Time for checking web3 status
  //   const timeoutId = setTimeout(() => {
  //     if (isMounted) {
  //       setTimeOut(true);
  //     }
  //   }, 1000);

  //   return () => {
  //     isMounted = false;
  //     clearTimeout(timeoutId);
  //   };

  // }, []);

  // useEffect(() => {
  //   try {
  //     const web3 = getWeb3();
  //     const accounts = web3.eth.getAccounts()
  //     setWeb3(web3);
  //     setAccounts(accounts)
  //     props.MobXStorage.initWeb3AndAccounts(web3, accounts)
  //   } catch (error) {
  //     console.log("error:", error);
  //   }
  //  initData()
  // }, [])
  // const initData = async () => {
  //   if (this._isMounted && props.MobXStorage.SmartFundsOriginal.length === 0) {
  //     const smartFunds = await getFundsList()
  //     props.MobXStorage.initSFList(smartFunds)
  //     // view current registry address
  //     console.log("SmartFundRegistryADDRESS: ", SmartFundRegistryADDRESS, "!___version 28/04/21___!")
  //     this.setState({ isDataLoad: true })
  //   }
  // }



  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: DashboardPages.DASHBOARD,
          element: <Dashboard {...props} web3={web3} isDataLoad={isDataLoad} setIsDataLoad={setIsDataLoad}/>
        },
        {
          path: DashboardPages.ABOUT,
          element: <About {...props} web3={web3} />
        },
        {
          path: DashboardPages.STACK,
          element: <StackCot />
        },
        {
          path: DashboardPages.BUY,
          element: <Buy />
        },
        {
          path: DashboardPages.TELEGRAM,
          element: <Telegram />
        },
        {
          path: DashboardPages.TWITTER,
          element: <Twitter />
        },
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
