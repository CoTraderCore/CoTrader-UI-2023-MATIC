import React, { Component } from 'react'
import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { EtherscanLink } from '../../config.js'
import { NavLink } from 'react-router-dom'
import { inject } from 'mobx-react'
// import Identicon from 'react-identicons'

class ManagerModal extends Component {
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

        return (
            <Box>
                <Text fontWeight={500}  onClick={() => this.setState({ Show: true })}>
                    Manager:
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
                        View manager info
                    </ModalHeader>
                    <ModalBody>
                        <ModalContent>
                            <Button  onClick={() => this.getManagerFunds()}>Search all funds of this manager</Button>
                            <NavLink to={"/user-txs/" + this.props.address}><Button>Get all txs</Button></NavLink>
                            <Button variant="outline-primary" href={EtherscanLink + "address/" + this.props.address} target="_blank" rel="noopener noreferrer">Etherscan</Button>
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

export default inject('MobXStorage')((ManagerModal));
