import React from 'react';
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
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: DashboardPages.DASHBOARD,
          element: <Dashboard />
        },
        {
          path: DashboardPages.ABOUT,
          element: <About />
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
