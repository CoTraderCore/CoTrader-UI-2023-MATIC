import React, { Component } from 'react';
import {
    Box,
    Text,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Image,
    GridItem,
    SimpleGrid,
} from '@chakra-ui/react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import getTokenSymbolAndDecimals from '../../../utils/getTokenSymbolAndDecimals';
// import { isAddress } from 'web3-utils';
import { isAddress } from 'web3-validator';

class SelectToken extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            ShowModal: false,
            symbol: '',
            decimals: 0,
            address: '',
            detectNewToken: false
        }
    }

    // extract address from global tokens obj by symbol
    getTokenAddressBySymbol = (symbol) => {
        const From = this.props.tokens.filter(item => item.symbol === symbol)
        return String(From[0].address).toLowerCase()
    }

    // reset states after close modal
    closeModal = () => this.setState({
        ShowModal: false,
        symbol: '',
        decimals: 0,
        address: '',
        detectNewToken: false
    })

    onChangeTypeHead = (name, param) => {
        this.props.onChangeTypeHead(name, param)
        this.closeModal()
    }

    // new function
    typeHeadHandler = async (address) => {
        if (isAddress(address)) {
            await this.fetchNewToken(address)
        }
    }

    // feth token data by address
    fetchNewToken = async (address) => {
        try {
            const {
                symbol,
                decimals
            } = await getTokenSymbolAndDecimals(address, this.props.web3)

            this.setState({
                symbol,
                decimals,
                address,
                detectNewToken: true
            })
        }
        catch (e) {
            alert("No standard token")
            console.log("err", e)
        }
    }

    addNewToken = async () => {
        const tokenData = {
            symbol: this.state.symbol,
            address: this.state.address,
            decimals: this.state.decimals
        }
        this.props.pushNewTokenInList(this.state.symbol, tokenData)
        this.props.onChangeTypeHead(this.props.direction, this.state.symbol)
        this.closeModal()
    }

    render() {
        return (
            <Box>
                <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => this.setState({ ShowModal: true })}
                    minWidth="160px"
                    maxWidth="160px"
                >
                    {this.props.currentSymbol}
                </Button>

                <Modal isOpen={this.state.ShowModal} onClose={() => this.closeModal()}>
                    <ModalOverlay />
                    <ModalContent height="430px">
                        <ModalHeader>Exchange</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody width="100%">
                            {this.props.tokens ? (
                                <>
                                    {this.state.detectNewToken ? (
                                        <Button colorScheme="red" variant="outline" onClick={() => this.addNewToken()}>
                                            Import {this.state.symbol} to list
                                        </Button>
                                    ) : null}
                                    <Box >
                                        <Typeahead
                                            inputProps={{
                                                className: 'my-custom-classname',
                                                style: {
                                                    'width': '100%',
                                                    'height': '100%',
                                                    'border': '1px solid #000',
                                                    'padding': '10px 10px',
                                                    'borderRadius': '5px',
                                                }
                                            }}
                                            defaultOpen={true}
                                            labelKey="selectTokens"
                                            multiple={false}
                                            id="basic-example"
                                            options={this.props.symbols}
                                            onChange={(s) => this.onChangeTypeHead(this.props.direction, s[0])}
                                            onInputChange={async (s) => this.typeHeadHandler(s)}
                                            placeholder="Type symbol or paste token address"
                                            renderMenuItemChildren={(options, props) => (
                                                <SimpleGrid borderRadius={5} border="1px solid black" gap={5} mt={1} p={4} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <GridItem >
                                                        <Image height="35px" width="35px"
                                                            src={`https://tokens.1inch.io/${this.getTokenAddressBySymbol(options)}.png`} alt="logo"
                                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://etherscan.io/images/main/empty-token.png" }}
                                                        />
                                                    </GridItem>
                                                    <GridItem>
                                                        <Text>{options}</Text>
                                                    </GridItem>
                                                </SimpleGrid>
                                            )}
                                        />
                                    </Box>
                                </>
                            ) : (
                                <Text>Load data</Text>
                            )}
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        );
    }
}

export default SelectToken;
