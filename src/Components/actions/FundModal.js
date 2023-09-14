import React from 'react';
import { Link, Text, Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { NavLink, } from 'react-router-dom';
import { EtherscanLink } from '../../config.js';
import MobXStorage from '../../MobXStorage.js';

const FundModal = ({ address, }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sliderBg = useColorModeValue("#fff", "#181144")
    const modalfooterbg = useColorModeValue("gray.100", "#3D3762")
    const btnColor = useColorModeValue("#00C6C0", "#fff")

    return (
        <Box>
            <Text fontWeight={{ base: "700", md: "500" }} onClick={onOpen} cursor={'pointer'}>
                Fund: <small style={{ color: "#7500fe", }}><strong >{String(address).replace(String(address).substring(4, 38), "...")}</strong></small>
            </Text>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={sliderBg}>
                    <ModalHeader>View fund info</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box pb={5} display={'flex'} justifyContent={'space-around'}>
                            {MobXStorage.web3 ? (
                                <NavLink to={"/web3off/fund/" + address} style={{ background: "transparent", width: "100%" }}>
                                <Button   color={btnColor}>
                            </Button>
                                </NavLink>
                            ) : (
                                <NavLink width="100%" to={"/web3off/fund/" + address}>
                                <Button   color={btnColor} >
                                See fund details
                             </Button>
                                </NavLink>
                            )}
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
    );
};

export default FundModal;
