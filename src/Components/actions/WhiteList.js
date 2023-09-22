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
          const contractInstance = new props.web3.eth.Contract(SmartFundABIV7,props.smartFundAddress
);
          const status = await contractInstance.methods.onlyWhitelist().call();
    
          if (isMounted) {
            setWhiteListStatus(status);
            setContract(contractInstance);
            setIsDataLoading(true);
          }
        };
    
        fetchData();
    
        return () => {
          isMounted = false;
        };
      }, [props.smartFundAddress, props.web3.eth.Contract]);
    
  
    const change = (e) => {
      const { name, value } = e.target;
      if (name === 'UserWhiteListAddress') {
        setUserWhiteListAddress(value);
      } else if (name === 'UserStatus') {
        setUserStatus(value);
      }
    };
  
    const setWhitelistOnly = (_bool) => {
      contract.methods.setWhitelistOnly(_bool).send({ from: props.accounts[0] });
      setShow(false);
    };
  
    const addToWhitelistOnly = (_bool) => {
      if (props.web3.utils.isAddress(userWhiteListAddress)) {
        contract.methods
          .setWhitelistAddress(userWhiteListAddress, userStatus)
          .send({ from: props.accounts[0] });
        setShow(false);
      } else {
        alert('Not a correct address');
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
            <Modal isOpen={show} onClose={modalClose}>
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
