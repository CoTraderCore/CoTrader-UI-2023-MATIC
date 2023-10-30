// For fully-onchain based funds

import React, { Component } from 'react'
import { APIEnpoint, SmartFundABI } from '../../../config.js'
import { Button, FormControl, Alert, FormLabel, AlertIcon, AlertDescription, Input } from '@chakra-ui/react'
import setPending from '../../../utils/setPending.js'
import { fromWei, toWei } from 'web3-utils'
import axios from 'axios'
// import { inject,observer } from 'mobx-react'

class DepositETH extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      DepositValue: 0,
      ValueError: '',
      ethBalance: 0
    }
  }

  componentDidMount = async () => {
  
      const ethBalanceInWei = await this.props.web3.eth.getBalance(this.props.accounts[0])
      const ethBalance = fromWei(ethBalanceInWei,'ether')

      this.setState({
        ethBalance
      })
   
  }


  validation = async () => {
    if (this.state.DepositValue <= 0) {
      this.setState({ ValueError: "Value can't be 0.01 or less" });
      return;
    }
    const userBalance = await this.props.web3.eth.getBalance(this.props.accounts[0])
    if (Number(this.state.DepositValue) > Number(fromWei(userBalance))) {
      this.setState({ ValueError: `Not enough ${this.props.mainAsset}` })
      return
    }

    this.depositETH()
  }

  depositETH = async () => {
    try {
      const _value = this.state.DepositValue
      const fundETH = new this.props.web3.eth.Contract(SmartFundABI, this.props.address)
      const amount = toWei(_value,'ether')
      // get cur tx count
      let txCount = await axios.get(APIEnpoint + 'api/user-pending-count/' + this.props.accounts[0])
      txCount = txCount.data.result

      let block = await this.props.web3.eth.getBlockNumber()

      this.props.modalClose()

      fundETH.methods.deposit().send({ from: this.props.accounts[0], value: amount })
        .on('transactionHash', (hash) => {
          // pending status for spiner
          this.props.pending(true, txCount + 1)
          // pending status for DB
          setPending(this.props.address, 1, this.props.accounts[0], block, hash, "Deposit")
        })
    } catch (e) {
      alert("Can not verify transaction data, please try again in a minute")
    }
  }

  render() {
    return (
      <React.Fragment>
        <FormControl>
          <FormLabel mt={2}>
            Enter {this.props.mainAsset}
            <Button
              variant="outline"
              sx={{ color: 'blue' }}
              onClick={() => this.setState({
                DepositValue: this.state.ethBalance
              })}
            >
              Balance:{this.state.ethBalance}
            </Button>
          </FormLabel>
          <Input type='number' min={0} placeholder='Amount' value={this.state.DepositValue} onChange={e => this.setState({ DepositValue: e.target.value })} />
          {
            this.state.ValueError !== ""
              ?
              (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertDescription>{this.state.ValueError}</AlertDescription>
                </Alert>
              )
              :
              (null)
          }
        </FormControl>

        <Button
          mt={2}
          colorScheme="green"
          onClick={() => this.validation()}
        >
          Deposit
        </Button>
      </React.Fragment>
    )
  }
}

export default DepositETH;
// export default inject('MobXStorage')(observer(DepositETH)) 

