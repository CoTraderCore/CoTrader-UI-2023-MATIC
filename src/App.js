import React, { useState,useEffect } from 'react';
import { ChakraProvider,} from '@chakra-ui/react';
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
import getFundsList from './utils/getFundsList';
import { SmartFundRegistryADDRESS } from './config';
// card color  #181144
// background color #110938
function App(props) {

  const [web3,setWeb3]=useState(null);
  const [network,setNetwork]=useState(0);
  const [isLoadNetID,setIsLoadNetID]=useState(false)
  const [accounts,setAccounts]=useState(null)
  const [isDataLoad,setIsDataLoad]=useState(false)
  const [_isMounted,_setIsMounted]=useState(false)

  useEffect(()=>{
    if(web3){
      web3.eth.net.getId().then(netId => {
        setNetwork(netId);
        setIsLoadNetID(true);
      });
    }
    
  },[])
  useEffect(()=>{
    try{
      const web3=getWeb3();
      const accounts=web3.eth.getAccounts()
      setWeb3(web3);
      setAccounts(accounts)
      props.MobXStorage.initWeb3AndAccounts(web3,accounts)
    }catch(error){
      console.log("error:",error);
    }

  },[])

  // const initData = async () => {
  //   if(_isMounted && MobXStorage.SmartFundsOriginal.length === 0){
  //     const smartFunds = await getFundsList()
  //     MobXStorage.initSFList(smartFunds)
  //     // view current registry address
  //     console.log("SmartFundRegistryADDRESS: ", SmartFundRegistryADDRESS, "!___version 28/04/21___!")
  //     this.setIsDataLoad({ isDataLoad: true })
  //   }
  // }



  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: DashboardPages.DASHBOARD,
          element: <Dashboard {...props} web3={web3} />
        },
        {
          path: DashboardPages.ABOUT,
          element: <About {...props} web3={web3}/>
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
