import React, { useState, useEffect } from 'react'
import { SmartFundABIV7 } from '../../config.js';
import { useDisclosure, Button, ListItem, ModalCloseButton, ModalContent, ModalOverlay, OrderedList, ModalBody, ModalHeader, Modal, useColorModeValue, } from '@chakra-ui/react';
import { fromWei } from 'web3-utils'
import Loading from '../template/spiners/Loading.js';

function UserHoldings(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [calculateAddressValue, setCalculateAddressValue] = useState("0");
    const [calculateAddressProfit, setCalculateAddressProfit] = useState("0");
    const [percentOfFundValue, setPercentOfFundValue] = useState("0");
    const [isLoad, setIsLoad] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            if (isOpen && props.address && !isLoad) {
                const fund = new props.web3.eth.Contract(SmartFundABIV7, props.address);
                const _calculateAddressValue = await fund.methods.calculateAddressValue(props.accounts[0]).call();
                const _calculateAddressProfit = await fund.methods.calculateAddressProfit(props.accounts[0]).call();
                const _fundValue = await fund.methods.calculateFundValue().call();

                // Percent of fund fundValue
                const percent = fromWei(_fundValue.toString(), 'wei') / 100
                const _percentOfFundValue = fromWei(_calculateAddressValue.toString(), 'wei') / percent

                setCalculateAddressValue(_calculateAddressValue.toString());
                setCalculateAddressProfit(_calculateAddressProfit.toString());
                setPercentOfFundValue(_percentOfFundValue);
                setIsLoad(true);
            }
        }

        fetchData();
    }, [isOpen]);

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
                        {isLoad ?
                            (
                                <React.Fragment>
                                    <OrderedList>
                                        <ListItem>My deposit in BNB value: {fromWei(calculateAddressValue, 'wei')}</ListItem>
                                        <ListItem>My profit : {fromWei(calculateAddressProfit, 'wei')}</ListItem>
                                        <ListItem>My holding in percent of fund value: {percentOfFundValue}%</ListItem>
                                    </OrderedList>
                                </React.Fragment>
                            ) : (
                                <Loading />
                            )
                        }


                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UserHoldings;
