import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalBody, useDisclosure, Button, ModalContent, Box, ModalCloseButton, ModalHeader, OrderedList, ListIcon, ListItem, Stack, Checkbox, flexbox, Text, FormControl, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Tooltip } from '@chakra-ui/react'
import DepositETH from './DepositETH'
import DepositERC20 from './DepositERC20'


function Deposit(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [agree, setAgree] = useState(false)

    return (
        <React.Fragment>
                <Tooltip>
                    <Button onClick={onOpen} flexGrow="1" minWidth={{ base: '100%',sm:"auto" }} bg="#5E39FF" color="#fff" sx={{ _hover: { backgroundColor: "#7500ff" } }}>Deposit</Button>
                </Tooltip>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Terms and Conditions</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <OrderedList>
                                <ListItem>I certify that I'm not a USA citizen or resident.</ListItem>
                                <ListItem>I understand CoTrader technology is new and is not to be trusted.</ListItem>
                                <ListItem>I understand that CoTrader aims to protect investors with technology regulation, that aims to prove fees, fair play, and past performance.</ListItem>
                                <ListItem>I understand I shouldn't deposit anything I can't afford to lose.</ListItem>
                            </OrderedList>
                            <Stack mt={2} spacing={[1]} direction={['column']}>
                                <Checkbox size='md' colorScheme='red' onChange={() => setAgree({ Agree: !agree })} />
                                <Text>I agree to the above Terms and Conditions to use this product. By cancelling you will not gain access to the service.</Text>
                            </Stack>
                            {
                                agree ? (
                                    <FormControl>
                                        {
                                            props.mainAssets === "ETH" || props.mainAssets === "BNB"
                                                ?
                                                (
                                                    <DepositETH
                                                        mainAsset={props.mainAsset}
                                                        accounts={props.accounts}
                                                        address={props.address}
                                                        web3={props.web3}
                                                        pending={props.pending}
                                                        modalClose={onClose}
                                                    />
                                                ) :
                                                (
                                                    <DepositERC20
                                                        mainAsset={props.mainAsset}
                                                        accounts={props.accounts}
                                                        address={props.address}
                                                        web3={props.web3}
                                                        pending={props.pending}
                                                        modalClose={onClose}
                                                    />
                                                )
                                        }
                                    </FormControl>
                                ) :
                                    (null)
                            }

                        </ModalBody>
                    </ModalContent>
                </Modal>
        </React.Fragment>
    )
}

export default Deposit
