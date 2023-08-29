import * as contant from './constants'
import MyFund from '../Pages/MyFund';
import MyInvestment from '../Pages/MyInvestment';
import AllFundWithoutWeb3 from '../Pages/AllFundWithoutWeb3';
import AllSmartFund from '../Pages/AllSmartFund';

export const dashbordTabs = [
    {  
        label : "All funds",
        id : contant.ALL_FUNDS,
        content : AllFundWithoutWeb3,
    },
    {
        label : "My funds",
        id : contant.MY_FUNDS,
        content : MyFund,
    },
    {
        label : "My Investement",
        id : contant.MY_INVESTMENTS,
        content : MyInvestment,
    },
  
]


export const smartfundlist = [
    {  
        label : "All funds",
        id : contant.ALL_FUNDS,
        content : AllSmartFund,
    },
    {
        label : "My funds",
        id : contant.MY_FUNDS,
        content : MyFund,
    },
    {
        label : "My Investement",
        id : contant.MY_INVESTMENTS,
        content : MyInvestment,
    },
  
]
