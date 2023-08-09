import * as contant from './constants'
import myfund from "../Pages/MyFund/myfund";
import allfund from "../Pages/AllFunds/allfund";
import myinvestment from "../Pages/MyInvestment/myinvestment";

export const dashbordTabs = [
    {  
        label : "All funds",
        id : contant.ALL_FUNDS,
        content : allfund,
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
