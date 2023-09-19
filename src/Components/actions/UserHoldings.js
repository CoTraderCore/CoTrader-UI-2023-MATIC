import React, { useState, useEffect } from 'react'
import { SmartFundABIV7 } from '../../config.js';
import { useDisclosure, Button, ListItem, ModalCloseButton, ModalContent, ModalOverlay, OrderedList, ModalBody, ModalHeader, Modal, Box, useColorModeValue, Tooltip } from '@chakra-ui/react';
// import Loading from '../template/spiners/Loading.js';
import { fromWei } from 'web3-utils'

function UserHoldings(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [calculateAddressValue, setCalculateAddressValue] = useState("0");
    const [calculateAddressProfit, setCalculateAddressProfit] = useState("0");
    const [percentOfFundValue, setPercentOfFundValue] = useState("0");
    const [isLoad, setIsLoad] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          if (isOpen && props.address && !isLoad) {
            try {
              const fund = props.web3 ? new props.web3.eth.Contract(SmartFundABIV7, props.address) : null;
    
              if (fund) {
                const _calculateAddressValue = await fund.methods.calculateAddressValue(props.accounts[0]).call();
                const _calculateAddressProfit = await fund.methods.calculateAddressProfit(props.accounts[0]).call();
                const _fundValue = await fund.methods.calculateFundValue().call();
    
                setCalculateAddressValue(_calculateAddressValue.toString());
                setCalculateAddressProfit(_calculateAddressProfit.toString());
                setPercentOfFundValue(_fundValue.toString());
                setIsLoad(true);
              }
            } catch (e) {
              console.log("error", e);
            }
          }
        };
        fetchData();
      }, [isOpen, props]);
    

    const addressValue = fromWei(calculateAddressValue, 'ether')
    const addressProfit = fromWei(calculateAddressProfit, 'ether')
    const percentvalue = fromWei(percentOfFundValue, 'ether') / 100

    const allbtnBg = useColorModeValue("#30106b", "#7500FF")
    const sliderBg = useColorModeValue("#fff", "#181144")

    return (
        <>
            <Button onClick={onOpen} flexGrow="1" width={{ base: "100%", md: "auto" }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>My Holding</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent bg={sliderBg}>
                    <ModalHeader closeButton>
                        My funds
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <React.Fragment>
                            <OrderedList>
                                <ListItem>My deposit in BNB value: {addressValue}</ListItem>
                                <ListItem>My profit : {addressProfit}</ListItem>
                                <ListItem>My holding in percent of fund value: {percentvalue}%</ListItem>
                            </OrderedList>
                        </React.Fragment>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UserHoldings;
