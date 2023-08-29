import React, { useState } from 'react'
import { APIEnpoint, SmartFundRegistryABIV9, SmartFundRegistryADDRESS } from '../../config.js'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, FormControl, Checkbox, CheckboxGroup, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Stack, Input, InputLeftAddon, useDisclosure, Select, } from '@chakra-ui/react'
import setPending from '../../utils/setPending'
import UserInfo from '../template/UserInfo.js'
import axios from 'axios'

const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
const USD_ADDRESS = '0xe9e7cea3dedca5984780bafc599bd69add087d56'

function CreateNewFund(props) {
    const [show, setShow] = useState(false);
    const [percent, setPercent] = useState(20);
    const [fundAsset, setFundAsset] = useState('BNB');
    const [fundName, setFundName] = useState('');
    const [tradeVerification, setTradeVerification] = useState(true);

    const createNewFund = async () => {
        if (percent > 0 && percent <= 30) {
            const contract = new props.web3.eth.Contract(SmartFundRegistryABIV9, SmartFundRegistryADDRESS);
            if (fundName !== '') {
                try {
                    const name = fundName;
                    const percentMultiplier = 100;
                    const verified = tradeVerification;
                    const block = await props.web3.eth.getBlockNumber();
                    const coreAsset = fundAsset === 'BNB' ? ETH_ADDRESS : USD_ADDRESS;

                    console.log(name, percent, coreAsset, verified, fundAsset);

                    // get current tx count
                    let txCount = await axios.get(APIEnpoint + 'api/user-pending-count/' + props.accounts[0]);
                    txCount = txCount.data.result;

                    // create fund
                    contract.methods
                        .createSmartFund(name, percent * percentMultiplier, coreAsset, verified)
                        .send({ from: props.accounts[0] })
                        .on('transactionHash', (hash) => {
                            // pending status for DB
                            setPending(null, 1, props.accounts[0], block, hash, 'SmartFundCreated');
                            props.pending(true, txCount + 1);
                        });
                    // close modal
                    modalClose();
                } catch (e) {
                    // for case if user rejects transaction
                    props.pending(false);
                    alert('Can not verify transaction data, please try again in a minute');
                    console.log('Error', e);
                }
            } else {
                alert('Please input fund name');
            }
        } else {
            alert('Please select correct percent, we support from 0.01% to 30%');
        }
    };

    const change = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'FundName':
                setFundName(value);
                break;
            case 'Percent':
                setPercent(value);
                break;
            case 'FundAsset':
                setFundAsset(value);
                break;
            case 'TradeVerification':
                setTradeVerification(value === 'true');
                break;
            default:
                break;
        }
    };

    const modalClose = () => {
        setShow(false);
        setPercent(20);
        setFundAsset('BNB');
        setFundName('');
        setTradeVerification(true);
    };

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box>
            <Button bg="#5E39FF" sx={{ color: "#fff", textTransform: "uppercase", _hover: { backgroundColor: "#7500ff" } }} onClick={onOpen} >
                Create fund
            </Button>

            <Modal
                isOpen={isOpen} onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader closeButton>
                        Create new fund <small>(with multi DEX support)</small>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input
                                style={{ width: "100%" }}
                                name="FundName"
                                placeholder='Fund name'

                                onChange={e => change(e)}
                            />

                            <FormLabel mt={5} display={'flex'}>Performance Fee % <UserInfo info="This is the % the fund manager earns for the profits earned, relative to main fund asset (BNB, USD or COT)." /></FormLabel>
                            <NumberInput onChange={e => change(e)}>
                                <NumberInputField
                                    InputProps={{
                                        inputProps: { min: 1 },
                                        startAdornment: (
                                            <>
                                                <InputLeftAddon children='%' />
                                                <Input type='number' placeholder='20' />
                                            </>
                                        )
                                    }}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <FormLabel mt={5} display={'flex'}>Main fund asset % <UserInfo info="With the help of this asset, investors will invest, calculate fund value ect" /></FormLabel>
                            <FormControl as="select" name="FundAsset" onChange={e => change(e)}>
                                <option >BNB</option>
                                <option >USD</option>
                            </FormControl>
                            <FormLabel mt={5} display={'flex'}>Limit Tokens <UserInfo info="This gives investors confidence that even if the trader's key is stolen, the worst a hacker can do is trade to legit tokens, not likely to a token just created by the trader to exit scam the fund, leaving it without value." /></FormLabel>

                            <Stack spacing={5} direction='row'>
                                <Checkbox colorScheme='red'
                                    checked={tradeVerification}
                                    onChange={() => setTradeVerification({ tradeVerification: !tradeVerification })}
                                >
                                    Use trade varification
                                </Checkbox>
                            </Stack>
                            <Button
                                mt={5}
                                colorScheme='green'
                                onClick={() => createNewFund()}
                            >
                                Create
                            </Button>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}


export default CreateNewFund
