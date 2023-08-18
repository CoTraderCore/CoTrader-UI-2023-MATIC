import React, { Component } from 'react'
import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, } from "@chakra-ui/react"
import { EtherscanLink } from '../../config.js'
import { NavLink } from 'react-router-dom'
import { inject, observer } from 'mobx-react'


class FundModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            Show: false,
        }
    }

    getManagerFunds() {
        this.props.MobXStorage.searchFundByManager(this.props.address)
        this.setState({ Show: false })
    }


    render() {
        let modalClose = () => this.setState({ Show: false });
        // const headingColor = useColorModeValue("#1B2559", "#F4F7FE");
        return (
            <Box>
                <Text fontWeight={500}  onClick={() => this.setState({ Show: true })}>
                    Fund:
                    {/*<Identicon size='10' string={this.props.address} /> */}
                    &ensp;
                    <small><strong>{String(this.props.address).replace(String(this.props.address).substring(4, 38), "...")}</strong></small>
                </Text>

                <Modal
                    show={this.state.Show}
                    onHide={modalClose}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <ModalOverlay />
                    <ModalHeader closeButton>
                        View fund info
                    </ModalHeader>
                    <ModalBody>
                        <ModalContent>
                            {
                                this.props.MobXStorage.web3
                                    ?
                                    (
                                        <NavLink to={"/fund/" + this.props.address}><Button variant="outline-primary" className="buttonsAdditional">See fund details</Button></NavLink>
                                    )
                                    :
                                    (
                                        <NavLink to={"/web3off/fund/" + this.props.address}><Button variant="outline-primary" className="buttonsAdditional">See fund details</Button></NavLink>
                                    )
                            }
                            <NavLink to={"/fund-txs/" + this.props.address}><Button variant="outline-primary">Get all txs</Button></NavLink>
                            <Button  href={EtherscanLink + "address/" + this.props.address} target="_blank" rel="noopener noreferrer">See fund on Etherscan</Button>
                        </ModalContent>
                    </ModalBody>
                    <ModalFooter>
                        Address: {this.props.address}
                    </ModalFooter>
                </Modal>

            </Box>
        )
    }
}

export default inject('MobXStorage')(observer(FundModal))
