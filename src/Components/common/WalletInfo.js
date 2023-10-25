import React, { Component } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { fromWei } from 'web3-utils'
import { RandomAvatar } from 'react-random-avatars'

class WalletInfo extends Component {

    state = {
        ETHBalance: 0
    }

    componentDidMount = async () => {
        setTimeout(async () => {
            if (this.props.accounts && this.props.web3) {
                const ETHBalance = parseFloat(fromWei(await this.props.web3.eth.getBalance(this.props.accounts[0]), 'ether')).toFixed(4);
                this.setState({ ETHBalance });
            }
        }, 1000)
    }
    render() {
        return (
            <Box mt={2} py={2} px={2}>
                {
                    this.props.accounts && this.props.web3 ?
                        (

                            <Box gap={2} fontSize="sm" sx={{ textAlign: "center", borderRadius: "5px", padding: "10px 5px", boxShadow: "1px 1px 1px 1px gray", border: "1px solid white", display: "flex", flexDirection: "column" }}>
                            {
                                    this.state.ETHBalance > 0 ?
                                        (
                                            <Text >
                                                <strong style={{ boxShadow: "1px 1px 1px 1px lightgray", padding: "0px 10px", color: "#7500ff", fontWeight: "500", }}>{this.state.ETHBalance}: <span style={{ color: "gray" }}>BNB</span></strong>
                                            </Text>
                                        ) : null
                                }
                                <Text gap={1} sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}><RandomAvatar name={this.props.accounts[0]} size="20" /><strong style={{ color: "#5E39FF", fontWeight: "500", }}>{String(this.props.accounts[0]).replace(String(this.props.accounts[0]).substring(6, 36), "...")}</strong></Text>
                            </Box>
                        ) : (
                            null
                        )

                }
            </Box>
        )
    }
}

export default WalletInfo
