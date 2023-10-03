import React from 'react';
import { Link, Text, Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { NavLink, } from 'react-router-dom';
import { EtherscanLink } from '../../config.js';
import { Observer, inject, } from 'mobx-react';
import { RandomAvatar } from 'react-random-avatars';

const FundModal = ({ address, MobXStorage }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sliderBg = useColorModeValue("#fff", "#181144")
    const modalfooterbg = useColorModeValue("gray.100", "#3D3762")
    const btnColor = useColorModeValue("#00C6C0", "#fff")

    return (
        <Observer>
            {() => {
                return (
                    <Box>
                        <Text gap={1} fontWeight={{ base: "700", md: "500" }} display="flex" alignItems="center" justifyContent="center">
                        Smart Fund: <RandomAvatar name={address} size="14" /><small onClick={onOpen} style={{ color: "#7500fe", cursor: "pointer" }}><strong >{String(address).replace(String(address).substring(4, 38), "...")}</strong></small>
                        </Text>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent bg={sliderBg}>
                                <ModalHeader>View fund info</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Box pb={5} display={'flex'} justifyContent={'space-around'}>
                                        <NavLink to={"/fund-txs/" + address} width="100%">
                                            <Button width="100%" color={btnColor}>Get all txs</Button>
                                        </NavLink>
                                    </Box>
                                    <Button width="100%" ><Link href={EtherscanLink + "address/" + address} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: btnColor }}>See fund on Etherscan</Link></Button>
                                </ModalBody>
                                <ModalFooter bg={modalfooterbg} borderBottomRadius={5}>
                                    <Text display="flex" fontSize="sm" fontWeight={500}> Address: {address}</Text>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                )
            }}
        </Observer>
    );
};

export default inject('MobXStorage')(FundModal);
