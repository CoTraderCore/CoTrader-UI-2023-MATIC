import React, { useEffect, useState } from "react";
import { SmartFundABIV7 } from "../../config";
import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Input,
    FormControl,
    Select,
    InputGroup,
    Checkbox,
    FormLabel,
    Tooltip,
    useColorModeValue
} from '@chakra-ui/react'
import UserInfo from "../template/UserInfo";
import { errors } from "web3";

const WhiteList = (props) => {
    const [show, setShow] = useState(false);
    const [whiteListStatus, setWhiteListStatus] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [contract, setContract] = useState([]);
    const [userWhiteListAddress, setUserWhiteListAddress] = useState('');
    const [userStatus, setUserStatus] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const contractInstance = new props.web3.eth.Contract(SmartFundABIV7, props.smartFundAddress);
                const status = await contractInstance.methods.onlyWhitelist().call();
                if (isMounted) {
                    setWhiteListStatus(status);
                    setContract(contractInstance);
                    setIsDataLoading(true);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [props.smartFundAddress, props.web3]);

    const change = e => {
        const { name, value } = e.target;
        if (name === "UserStatus") {
            setUserStatus(value === "true");
        } else {
            setUserWhiteListAddress(value);
        }
    };

    const setWhitelistOnly = async (_bool) => {
        try {
            await contract.methods.setWhitelistOnly(_bool).send({ from: props.accounts[0] });
            setShow(false);
        } catch (error) {
            console.log(error);
        }
    };

    const addToWhitelistOnly = async () => {
        try {
            if (props.web3.utils.isAddress(userWhiteListAddress)) {

                await contract.methods.setWhitelistAddress(userWhiteListAddress, userStatus).send({ from: props.accounts[0] });
                setShow(false);

            } else {
                console.log('Not a correct address');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const modalClose = () => setShow(false);
    const allbtnBg = useColorModeValue("#30106b", "#7500FF")
    const sliderBg = useColorModeValue("#fff", "#181144")
    return (
        <>
            <Tooltip label="This function allows the fund manager to add a user to the white list or remove them.">
                <Button flexGrow="1" minWidth={{ base: '100%', md: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }} onClick={() => setShow(true)}>
                    White list
                </Button>
            </Tooltip>
            <Modal isOpen={show} onClose={modalClose} isCentered>
                <ModalOverlay />
                <ModalContent bg={sliderBg}>
                    <ModalHeader>
                        White list
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        {
                            whiteListStatus && isDataLoading ?
                                (
                                    <FormControl>
                                        <InputGroup display="flex" flexDirection="column">
                                            <FormLabel>User :</FormLabel>

                                            <Input
                                                type="text"
                                                placeholder="ETH address"
                                                name="UserWhiteListAddress"
                                                value={userWhiteListAddress}
                                                onChange={(e) => change(e)}
                                            />
                                        </InputGroup>
                                        <br />
                                        <Box>
                                            <FormLabel display="flex">
                                                Add to white list <UserInfo info="if true, the address will be added to the whitelist users who can do deposits; if false, the address will be removed" /> :
                                            </FormLabel>

                                            <Select name="UserStatus" value={userStatus} onChange={(e) => change(e)}>
                                                <option value="true">True</option>
                                                <option value="false">False</option>
                                            </Select>
                                        </Box>
                                        <Button mt={2} colorScheme="green" onClick={() => addToWhitelistOnly()}>
                                            Send
                                        </Button>
                                        <br />
                                        <br />
                                        <InputGroup>
                                            <Checkbox
                                                colorScheme='green'
                                                onChange={() => setWhitelistOnly(false)}
                                            >
                                                Turn off the white list
                                            </Checkbox>
                                        </InputGroup>
                                    </FormControl>
                                ) : (
                                    <FormControl>
                                        <InputGroup>
                                            <Checkbox
                                                colorScheme='red'
                                                onChange={() => setWhitelistOnly(true)}
                                            >
                                                Turn on the white list
                                            </Checkbox>
                                        </InputGroup>
                                    </FormControl>
                                )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default WhiteList;
