import React, { Component } from 'react';
import { APIEnpoint, SmartFundABIV7, ERC20ABI } from '../../../config.js';
import {
    Button,
    FormControl,
    Alert,
    FormLabel,
    AlertIcon,
    AlertDescription,
    Input,
} from '@chakra-ui/react';
import setPending from '../../../utils/setPending.js';
import { toWeiByDecimalsInput, fromWeiByDecimalsInput } from '../../../utils/weiByDecimals';
import axios from 'axios';
import BigNumber from 'bignumber.js';
// import { inject,observer } from 'mobx-react';

class DepositERC20 extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            DepositValue: 0,
            ValueError: '',
            ercAssetAddress: null,
            ercAssetContract: null,
            userWalletBalance: '0',
            isApproved: true,
            approvePending: false,
            symbol: '',
            tokenBalance: 0,
        };
    }

    componentDidMount = async () => {
            const fund = new this.props.web3.eth.Contract(SmartFundABIV7, this.props.address);
            const ercAssetAddress = await fund.methods.coreFundAsset().call();
            const ercAssetContract = new this.props.web3.eth.Contract(ERC20ABI, ercAssetAddress);
            const symbol = await ercAssetContract.methods.symbol().call();
            const decimals = await ercAssetContract.methods.decimals().call();
            const tokenBalanceInWei = await ercAssetContract.methods.balanceOf(this.props.accounts[0]).call();
            const tokenBalance = fromWeiByDecimalsInput(BigNumber(decimals), tokenBalanceInWei);
            this.setState({
                ercAssetAddress,
                ercAssetContract,
                symbol,
                tokenBalanceInWei,
                tokenBalance,
            });
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevState.DepositValue !== this.state.DepositValue) {
            await this.updateAllowance();
        }
    }

    checkAllowanceInterval() {
        let timerId = setInterval(async () => {
            const isApproved = await this.updateAllowance();
            console.log("isApproved", isApproved);
            if (isApproved) {
                clearInterval(timerId);
                this.setState({ approvePending: false });
            }
        }, 3000);
    }

    validation = async () => {
        
            if (this.state.DepositValue <= 0) {
                this.setState({ ValueError: "Value can't be 0.01 or less" });
                return;
            }
            const ercAssetDecimals = await this.state.ercAssetContract.methods.decimals().call();
            const userWalletBalance = await this.state.ercAssetContract.methods.balanceOf(
                this.props.accounts[0]
            ).call();
            const userBalanceFromWei = fromWeiByDecimalsInput(ercAssetDecimals, userWalletBalance);

            if (this.state.DepositValue > userBalanceFromWei) {
                this.setState({ ValueError: `Not enough ${this.state.symbol}` });
                return;
            }

            this.depositERC20();
    }

    updateAllowance = async () => {
            const allowance = await this.state.ercAssetContract.methods.allowance(
                this.props.accounts[0],
                this.props.address
            ).call();

            const allowanceFromWei = fromWeiByDecimalsInput(
                await this.state.ercAssetContract.methods.decimals().call(),
                allowance
            );

            const isApproved = Number(allowanceFromWei) >= Number(this.state.DepositValue);

            this.setState({
                isApproved
            });

            return isApproved;
    }

    unlockERC20 = async () => {
        try {
            // get cur tx count
            let txCount = await axios.get(APIEnpoint + 'api/user-pending-count/' + this.props.accounts[0]);
            txCount = txCount.data.result;

            let block = await this.props.web3.eth.getBlockNumber();

            // Approve max ERC to smart fund
            this.state.ercAssetContract.methods.approve(
                this.props.address,
                "115792089237316195423570985008687907853269984665640564039457584007913129639935"
            )
                .send({ from: this.props.accounts[0] })
                .on('transactionHash', (hash) => {
                    // pending status for spinner
                    this.props.pending(true, txCount + 1);
                    // pending status for DB
                    setPending(this.props.address, 1, this.props.accounts[0], block, hash, "Deposit");
                    // run interval
                    this.checkAllowanceInterval();
                    // show pending
                    this.setState({ approvePending: true });
                });
        }
        catch (e) {
            alert("Can not verify transaction data, please try again in a minute");
            console.log("err: ", e);
        }
    }

    depositERC20 = async () => {
        try {
            // convert input to wei by decimals
            const ercAssetDecimals = await this.state.ercAssetContract.methods.decimals().call();
            const amount = toWeiByDecimalsInput(ercAssetDecimals, this.state.DepositValue);

            // get fund contract
            const fundERC20 = new this.props.web3.eth.Contract(SmartFundABIV7, this.props.address);

            // get cur tx count
            let txCount = await axios.get(APIEnpoint + 'api/user-pending-count/' + this.props.accounts[0]);
            txCount = txCount.data.result;

            let block = await this.props.web3.eth.getBlockNumber();

            this.props.modalClose();

            // Deposit ERC20
            fundERC20.methods.deposit(amount)
                .send({ from: this.props.accounts[0] })
                .on('transactionHash', (hash) => {
                    // pending status for spinner
                    this.props.pending(true, txCount + 1);
                    // pending status for DB
                    setPending(this.props.address, 1, this.props.accounts[0], block, hash, "Deposit");
                });
        }
        catch (e) {
            alert("Can not verify transaction data, please try again in a minute");
            console.log("err: ", e);
        }
    }

    modalClose = () => this.setState({ Show: false, Agree: false });
   
    render() {
        return (
            <React.Fragment>
                <FormControl>
                    <FormLabel>
                        Enter {this.state.symbol}
                        <Button
                            sx={{ color: 'blue' }}
                            onClick={() => this.setState({
                                DepositValue: this.state.tokenBalance
                            })}
                        >
                            (balance:{this.state.tokenBalance})
                        </Button>
                    </FormLabel>
                    <Input type='number' min="0" placeholder='Amount' value={this.state.DepositValue} onChange={e => this.setState({ DepositValue: e.target.value })} />
                    {
                        this.state.ValueError !== ""
                            ? (
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertDescription>{this.state.ValueError}</AlertDescription>
                                </Alert>
                            )
                            : null
                    }
                </FormControl>

                {
                    !this.state.isApproved
                        ? (
                            <>
                                <Button
                                    mt={2}
                                    colorScheme='red'
                                    onClick={() => this.unlockERC20()}
                                >
                                    Unlock
                                </Button>
                                <br />
                                <br />
                                {
                                    this.state.approvePending
                                        ? (
                                            <small>Please wait for the transaction to be confirmed ...</small>
                                        )
                                        : null
                                }
                            </>
                        )
                        : (
                            <Button
                                mt={2}
                                colorScheme="green"
                                variant="outline"
                                onClick={() => this.validation()}
                            >
                                Deposit
                            </Button>
                        )
                }
            </React.Fragment>
        );
    }
}

export default DepositERC20;
// export default inject('MobXStorage')(observer(DepositERC20)) 
