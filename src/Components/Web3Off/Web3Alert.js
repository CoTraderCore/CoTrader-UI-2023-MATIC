import React from 'react';
import { Alert, Stack } from '@chakra-ui/react';
import { AlertIcon } from '@chakra-ui/react';

const Web3Allert = () => (
  <>
    
    <Stack>
      <Alert status='info' display={'flex'} justifyContent={'center'} >
        <AlertIcon />
        <p> Please connect web3: use MetaMask for <a style={{ color: "#8073de", }} href="https://metamask.io/" target="_blank" rel="noopener noreferrer">laptop</a> or <a style={{ color: "#8073de" }} href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Android</a>, or Coinbase Wallet for <a style={{ color: "#8073de" }} href="https://wallet.coinbase.com/" target="_blank" rel="noopener noreferrer">iPhone</a> </p>
      </Alert>
    </Stack>
  </>
)

export default Web3Allert
