// switch this to false in production
const isLocal = false




export const APIEnpoint = !isLocal ? 'https://api-bsc.cotrader.com/' : 'http://localhost:9005/'
export const EtherscanLink = 'https://bscscan.com/'