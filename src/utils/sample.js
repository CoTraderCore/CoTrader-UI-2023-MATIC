import * as contant from './constants'
import MyFund from '../Pages/MyFund';
import MyInvestment from '../Pages/MyInvestment';
import SmartFundListWithoutWeb3 from '../Pages/AllFunds';

export const dashbordTabs = [
    {  
        label : "All funds",
        id : contant.ALL_FUNDS,
        content : SmartFundListWithoutWeb3,
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
