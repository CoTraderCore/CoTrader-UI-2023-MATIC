import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';


// import { Typeahead } from 'react-bootstrap-typeahead';
import getTokenSymbolAndDecimals from '../../../utils/getTokenSymbolAndDecimals';
import { isAddress } from 'web3-utils';

function SelectToken(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [symbol, setSymbol] = useState('');
    const [decimals, setDecimals] = useState(0);
    const [address, setAddress] = useState('');
    const [detectNewToken, setDetectNewToken] = useState(false);

    const getTokenAddressBySymbol = (symbol) => {
        const foundToken = props.tokens.find(item => item.symbol === symbol);
        return String(foundToken.address).toLowerCase();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSymbol('');
        setDecimals(0);
        setAddress('');
        setDetectNewToken(false);
    };

    const typeHeadHandler = async (address) => {
        if (isAddress(address)) {
            await fetchNewToken(address);
        }
    };

    const fetchNewToken = async (address) => {
        try {
            const { symbol, decimals } = await getTokenSymbolAndDecimals(address, props.web3);
            setSymbol(symbol);
            setDecimals(decimals);
            setAddress(address);
            setDetectNewToken(true);
        } catch (e) {
            alert('No standard token');
            console.log('err', e);
        }
    };

    const addNewToken = () => {
        const tokenData = {
            symbol: symbol,
            address: address,
            decimals: decimals
        };
        props.pushNewTokenInList(symbol, tokenData);
        props.onChangeTypeHead(props.direction, symbol);
        closeModal();
    };
    const options = props.symbols;
    return (
        <div>
            <Button
                variant="outline"
                onClick={() => setIsModalOpen(true)}
                minWidth="160px"
                maxWidth="160px"
            >
                {props.currentSymbol}
            </Button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Exchange</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {props.tokens ? (
                            <>
                                <br />
                                {detectNewToken ? (
                                    <Button colorScheme="blue" onClick={addNewToken}>
                                        Import {symbol} to list
                                    </Button>
                                ) : null}
                                <br />
                                <br />
                                <Box>
                                    <Flex alignItems="center">
                                        <Image
                                            boxSize="35px"
                                            objectFit="cover"
                                            src={`https://tokens.1inch.exchange/${getTokenAddressBySymbol(options)}.png`}
                                            alt="TOKEN"
                                        />
                                        <Box marginLeft="2">
                                            <Input
                                                value={props.selectedSymbol}
                                                onChange={(event) => props.onChangeTypeHead(props.direction, event.target.value)}
                                                onInput={(event) => typeHeadHandler(event.target.value)}
                                                placeholder="Type symbol or paste token address"
                                            />
                                        </Box>
                                    </Flex>
                                </Box>
                                <br />
                                <br />
                            </>
                        ) : (
                            <p>Load data</p>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default SelectToken;
