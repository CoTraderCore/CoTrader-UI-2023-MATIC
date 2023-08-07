import React from 'react';
import './App.css';
import { ChakraProvider, Stack } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Components/Pages/Dashboard';
import About from './Components/Pages/About';
import Buy from './Components/Pages/Buy';
import Telegram from './Components/Pages/Telegram';
import Twitter from './Components/Pages/Twitter';
import DashboardLayout from './Layouts/DashboardLayout';
import { DashboardPages } from './Components/utils/Pages';
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
          element: <Stack />
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
      <ChakraProvider className="App">
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.Fragment>
  );
}

export default App;
