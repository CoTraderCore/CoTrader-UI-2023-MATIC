import React from 'react';
import getWeb3 from '../utils/getWeb3'
import { Button, Text, Box } from '@chakra-ui/react';
import { BiBadgeCheck } from 'react-icons/bi'
import {
  NeworkID,
} from '../config'
import { inject, observer } from 'mobx-react';

// const connectWallet = async (mobx) => {
//   await getWeb3().then(async (response) => {
//     const _web3 = response
//     const _netId = Number(await response.eth.net.getId())
//     const _accounts = response.eth.getAccounts()
//     mobx.initWeb3AndAccounts(_web3, _accounts, _netId)
//   });
// }

function Wallet(props) {
  console.log("props.MobXStorage.web3", props.MobXStorage.web3);
  console.log("props.MobXStorage.account", props.MobXStorage.account);
  console.log("props.MobXStorage.netId", props.MobXStorage.netId);
  return (
    <React.Fragment>
      {props.MobXStorage.web3 ? (
        <Box gap={2}>
          <Button
            display="flex"
            gap={1}
            size={{ sm: "xs", md: "sm" }}
            fontSize={["xs", "sm"]}
            px={[2, 3]}
            py={[1, 3]}
            bg={props.btnbg}
            _hover={{ background: "gray.200" }}
            sx={{ color: "#34e391" }}
          >
            <BiBadgeCheck size={20} /> <Text>Connected</Text>
          </Button>
        </Box>
      )
        :
        (
          <Box>
            <Button
              size={{ sm: "xs", md: "sm" }}
              fontSize={["xs", "sm"]}
              px={[2, 3]}
              py={[1, 3]}
              bg={props.btnbg}
              _hover={{ background: "gray" }}
              onClick={() => props.connectWallet(props.MobXStorage)}
            >
              Connect wallet
            </Button>
          </Box>
        )
      }
    </React.Fragment>
  );
}

export default inject('MobXStorage')(observer(Wallet));
