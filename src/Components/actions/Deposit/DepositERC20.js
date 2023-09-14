import React, { Component } from 'react';
import { APIEnpoint, SmartFundABIV7, ERC20ABI } from '../../../config.js';
import {
    Button,
    FormControl,
    Alert,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    AlertIcon,
    AlertDescription,
    Text,
} from '@chakra-ui/react';
import setPending from '../../../utils/setPending.js';
import { toWeiByDecimalsInput, fromWeiByDecimalsInput } from '../../../utils/weiByDecimals';
import axios from 'axios';

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
            symbol: '...',
            tokenBalance: 0,
        };
    }

    componentDidMount = async () => {
        try {
            const fund = new this.props.web3.eth.Contract(SmartFundABIV7, this.props.address);
            const ercAssetAddress = await fund.methods.coreFundAsset().call();
            const ercAssetContract = new this.props.web3.eth.Contract(ERC20ABI, ercAssetAddress);
            const symboll = await ercAssetContract.methods.symbol().call();
            const decimals = await ercAssetContract.methods.decimals().call();
            const tokenBalanceInWei = await ercAssetContract.methods.balanceOf(this.props.accounts[0]).call();
            const tokenBalancee = fromWeiByDecimalsInput(decimals, tokenBalanceInWei);
    
            this.setState({
                ercAssetAddress,
                ercAssetContract,
                symboll,
                tokenBalanceInWei,
                tokenBalancee,
            });
           
        } catch (error) {
            console.error("Error", error);
        }
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
        try {
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
        } catch (error) {
            console.error("Error", error);
        }
    }

    updateAllowance = async () => {
        try {
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
        } catch (error) {
            console.log("error", error);
            return false;
        }
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
            <>
                <FormControl>
                    <FormLabel>
                        Enter {this.state.symbol}
                        <Text
                            style={{ color: 'blue' }}
                            onClick={() => this.setState({
                                DepositValue: this.state.tokenBalance
                            })}
                        >
                            (balance:{this.state.tokenBalance})
                        </Text>
                    </FormLabel>
                    <NumberInput defaultValue={this.state.DepositValue} min={0}>
                        <NumberInputField
                            placeholder='Amount'
                            onChange={e => this.setState({ DepositValue: e.target.value })}
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
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
                    this.state.isApproved 
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
            </>
        );
    }
}

export default DepositERC20;
