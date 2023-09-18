import React from 'react';
import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, useDisclosure, Text, Link, useColorModeValue, } from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';
import { EtherscanLink } from '../../config.js';
import MobXStorage from '../../MobXStorage.js';
import { inject, Observer } from 'mobx-react';


const ManagerModal = ({ address, }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const getManagerFunds = () => {
        MobXStorage.searchFundByManager(address);
        onClose();
    };
    const sliderBg = useColorModeValue("#fff", "#181144")
    const modalfooterbg = useColorModeValue("gray.100", "#3D3762")
    const btnColor = useColorModeValue("#00C6C0", "#fff")

    return (
        <Observer>
            {() => {
                return (
                    <Box>
                        <Text cursor={'pointer'} fontWeight={500} onClick={onOpen}>
                            Manager: <small style={{ color: "#7500fe", }}><strong>{String(address).replace(String(address).substring(4, 38), "...")}</strong></small>
                        </Text>
                        <Modal isOpen={isOpen} onClose={onClose} aria-labelledby="example-modal-sizes-title-sm">
                            <ModalOverlay />
                            <ModalContent bg={sliderBg}>
                                <ModalHeader>View Manager Info</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Button color={btnColor} width="100%" onClick={() => getManagerFunds()}>Search all funds of this manager</Button>
                                    <Box mt={5} style={{ display: "flex", justifyContent: "space-around" }}>
                                        <NavLink to={"/user-txs/" + address} >
                                            <Button color={btnColor} >Get all txs</Button>
                                        </NavLink>
                                        <Button>
                                            <Link style={{ color: btnColor, textDecoration: "none" }} href={EtherscanLink + "address/" + address} target="_blank" rel="noopener noreferrer">Etherscan</Link>
                                        </Button>
                                    </Box>
                                </ModalBody>
                                <ModalFooter bg={modalfooterbg} borderBottomRadius={5}>
                                    <Text fontSize="sm" fontWeight={500}>
                                        Address: {address}
                                    </Text>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                )
            }}
        </Observer>
    );
};

export default inject('MobXStorage')(ManagerModal);
