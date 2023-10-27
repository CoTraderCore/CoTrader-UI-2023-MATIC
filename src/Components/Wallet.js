import React from 'react';
import getWeb3 from '../utils/getWeb3'
import {
  NeworkID,
} from '../config'
import { inject, observer } from 'mobx-react';

const connectWallet = async(mobx) => {
  await getWeb3().then(async (response) => {
    const _web3 = response
    const _netId = Number(await response.eth.net.getId())
    const _accounts = response.eth.getAccounts()
    mobx.initWeb3AndAccounts(_web3, _accounts, _netId)
  });
}

function Wallet(props) {
  return (
    <>
    {(props.MobXStorage.web3)
      ?
      <>
      <p style={{ color:'white' }}>
      Account Connected
      </p>

      {
        props.MobXStorage.netId && NeworkID !== props.MobXStorage.netId
        ?
        (
          <p style={{"color":"red"}}>ERROR: WRONG NETWORK</p>
        )
        : null
      }
      </>
      :
      <div className="login-button">
       <button
        type='button'
        className='login-writeButton'
        onClick = {() => connectWallet(props.MobXStorage)}
        >
         Connect wallet
       </button>
      </div>
      }
    </>
    );
}

export default inject('MobXStorage')(observer(Wallet));
