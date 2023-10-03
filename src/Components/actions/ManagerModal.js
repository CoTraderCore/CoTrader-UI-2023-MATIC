import React from 'react';
import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, useDisclosure, Text, Link, useColorModeValue, } from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';
import { EtherscanLink } from '../../config.js';
import { inject, Observer } from 'mobx-react';
import { RandomAvatar } from 'react-random-avatars';


const ManagerModal = ({ address, MobXStorage }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sliderBg = useColorModeValue("#fff", "#181144")
    const modalfooterbg = useColorModeValue("gray.100", "#3D3762")
    const btnColor = useColorModeValue("#00C6C0", "#fff")

    return (
        <Observer>
            {() => {
                return (
                    <Box>
                        <Text gap={1} fontWeight={500} display="flex" alignItems="center" justifyContent="center" >
                            Owner: <RandomAvatar name={address} size="14" /><small onClick={onOpen} style={{ color: "#7500fe", cursor: "pointer" }}><strong>{String(address).replace(String(address).substring(4, 38), "...")}</strong></small>
                        </Text>
                        <Modal isOpen={isOpen} onClose={onClose} aria-labelledby="example-modal-sizes-title-sm">
                            <ModalOverlay />
                            <ModalContent bg={sliderBg}>
                                <ModalHeader>View Manager Info</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
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
