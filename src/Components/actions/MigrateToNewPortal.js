import React, { useState } from 'react'

import {
  SmartFundABIV7,
  ExchangePortalAddressLight,
  PricePortalPancakeABI,
  PricePortalPancake,
  WETH
} from '../../config.js'

import { Alert, AlertIcon, Box, Button } from '@chakra-ui/react'


async function verifyConnector(tokenTo, web3) {
  try{
  const pricePortal = new web3.eth.Contract(PricePortalPancakeABI, PricePortalPancake)
  const connector = await pricePortal.methods.findConnector(tokenTo).call()
  return connector
  }catch(e){
    console.log("eth error",e);
  }
}

async function verifyСompatibility(web3, accounts, smartFundAddress, closeModal, setIssueAddresses) {
  const zerroAddress = "0x0000000000000000000000000000000000000000"
  const ethAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
 try{
  const fund = new web3.eth.Contract(SmartFundABIV7, smartFundAddress)
  const tokens = await fund.methods.getAllTokenAddresses().call()

  // replace ETH with WETH
  tokens.forEach(function (item, i) {
    if (String(item).toLowerCase() === String(ethAddress).toLowerCase()) tokens[i] = WETH
  })

  const issueAddresses = []
  for (let i = 0; i < tokens.length; i++) {
    const connector = await verifyConnector(tokens[i], web3)
    if (String(connector).toLowerCase(connector) === String(zerroAddress).toLowerCase()) {
      issueAddresses.push(tokens[i])
    }

  }

  if (issueAddresses.length === 0) {
    updateTradePortal(web3, accounts, smartFundAddress, closeModal)
  } else {
    setIssueAddresses(issueAddresses)
  }
}catch(e){
  console.log(e);
}
}
// provide to fund latest version of trade portal
function updateTradePortal(web3, accounts, smartFundAddress, closeModal) {
  const smartFund = new web3.eth.Contract(SmartFundABIV7, smartFundAddress)
  smartFund.methods.setNewExchangePortal(ExchangePortalAddressLight)
    .send({ from: accounts[0] })
  closeModal()
}

function MigrateToNewPortal(props) {
  const [issueAddresses, setIssueAddresses] = useState([])
  return (
    <>
      {
        String(props.exchangePortalAddress).toLowerCase() !== String(ExchangePortalAddressLight).toLowerCase()
          ?
          (
            <Box>

              <Alert status="warning">
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <strong>Your trade portal version is deprecated, please update for get best options</strong>
                  <hr />
                  <Button
                    my={2}
                    colorScheme='red'
                    size="sm"
                    onClick={() => verifyСompatibility(
                      props.web3,
                      props.accounts,
                      props.smartFundAddress,
                      props.closeModal,
                      setIssueAddresses
                    )}
                  >
                    Update
                  </Button>
                  <hr />
                  <small style={{ color: "red" }}><strong>NOTE: If your update transaction was confirmed, but you still see this message, please reload the page</strong></small>
                </Box>
              </Alert>

              {
                issueAddresses.length > 0
                  ?
                  (
                    <Alert status="error">
                      <AlertIcon />
                      New portal not support this tokens, please sell, then update
                      <hr />
                      {issueAddresses.map((item, key) => <p key={key}>{item}</p>)}
                    </Alert>
                  )
                  : null
              }
            </Box>
          )
          :
          (
            null
          )
      }
    </>
  )
}

export default MigrateToNewPortal
