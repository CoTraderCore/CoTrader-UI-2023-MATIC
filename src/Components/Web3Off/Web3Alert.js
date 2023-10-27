import React from 'react';
import { Alert, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { LuAlertTriangle } from 'react-icons/lu';
import { inject, observer } from 'mobx-react';

const Web3Allert = (props) => {
  const txtColor=useColorModeValue("red","red")
  const statusbg=useColorModeValue("warning","info")

return(
  <>
    {
      !props.MobXStorage.web3
      ?
      (
        <>
        <Stack>
        <Alert gap={2} status={statusbg} display={'flex'} justifyContent={'center'} >
          <LuAlertTriangle fontSize="1.3rem" color={"red"}/>
          <Text color={txtColor} fontSize="sm"> Please connect web3: use MetaMask for <a style={{ color: "#039BE5", }} href="https://metamask.io/" target="_blank" rel="noopener noreferrer">laptop</a> or <a style={{ color: "#039BE5" }} href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Android</a>, or Coinbase Wallet for <a style={{ color: "#039BE5" }} href="https://wallet.coinbase.com/" target="_blank" rel="noopener noreferrer">iPhone</a> </Text>
        </Alert>
        </Stack>
        </>
      )
      : (null)
    }
  </>
)}

export default inject('MobXStorage')(observer(Web3Allert));



