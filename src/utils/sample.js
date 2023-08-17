import * as contant from './constants'
import myfund from "../Pages/MyFund/myfund";
import myinvestment from "../Pages/MyInvestment/myinvestment";
import AllFunds from '../Pages/AllFunds/AllFunds';
export const dashbordTabs = [
    {  
        label : "All funds",
        id : contant.ALL_FUNDS,
        content : AllFunds,
    },
    {
        label : "My funds",
        id : contant.MY_FUNDS,
        content : myfund,
    },
    {
        label : "My Investement",
        id : contant.MY_INVESTMENTS,
        content : myinvestment,
    }
]
