import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { fromWei } from 'web3-utils'
import { FormLabel, Input, Button, FormControl, Box, NumberInput, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, Select, NumberInputStepper, } from '@chakra-ui/react'
import MobXStorage from '../../../MobXStorage'
class FundFilter extends Component {
    constructor(props, context) {
        super(props, context)
        const initialState = {
            owner: '',
            name: '',
            valueInETH: '',
            valueInUSD: '',
            profitInETH: '',
            profitInUSD: '',
            mainAsset: '',
            address: '',
            timeCreation: 0
        }

        this.state = MobXStorage.filterOptions
            ? MobXStorage.filterOptions
            : initialState
    }


    // filter smart funds by multi options
    // compare if strings math
    // compare if numbers bigger than
    multiFilter() {
        // get options from states
        const filterOptions = { ...this.state }
        // remove null, undefiend, empty  '' and 0 value
        let filteredOptions = this.removeEmptyValue(filterOptions)

        // get cur funds
        let currentFunds = MobXStorage.SmartFundsOriginal
        let filtered
        let filterKeys = []

        // don't apply filter if user not select any filter option
        if (Object.keys(filteredOptions).length !== 0) {
            // aply multiple filter
            for (let key in filteredOptions) {
                // push filter keys
                filterKeys.push(key)
                // filter by time creation
                if (key === 'timeCreation') {
                    // this.timeCreationFilter(currentFunds, filteredOptions[key])
                    // filtered = currentFunds
                    filtered = this.timeCreationFilter(currentFunds, filteredOptions[key])
                }
                // filter by match strings
                else if (typeof filteredOptions[key] === 'string') {
                    filtered = currentFunds.filter((item) => this.stringFilter(item, key, filteredOptions[key]))
                }
                // filter by compare numbers (>=)
                else if (typeof filteredOptions[key] === 'number') {
                    filtered = currentFunds.filter((item) => this.numberFilter(item, key, filteredOptions[key]))
                }
                else {
                    console.log("Unknown filter type")
                }
                currentFunds = filtered
            }
            // update MobxStorage
            MobXStorage.updateSmartFundsListByFilter(filtered, filterOptions, filterKeys)
        }

        this.props.onCloseModal()
    }

    // helpers
    stringFilter = (item, key, value) => {
        if (item[key].toLowerCase().includes(value.toLowerCase())) {
            return true
        } else {
            return false
        }
    }

    numberFilter = (item, key, value) => {
        if (Number(fromWei(item[key])) >= value) {
            return true
        } else {
            return false
        }
    }

    timeCreationFilter = (list, state) => {
        console.log(list[0].timeCreation)
        if (state === 'Newest') {
            return list.slice().sort(function (a, b) {
                return Number(b.timeCreation) - Number(a.timeCreation)
            })
        }
        else if (state === 'Oldest') {
            return list.slice().sort(function (a, b) {
                return Number(a.timeCreation) - Number(b.timeCreation)
            })
        }
        else {
            return list
        }
    }

    // remove null, undefiend, 0, and '' values from object
    removeEmptyValue = (obj) => {
        let newObj = {}
        Object.keys(obj).forEach((prop) => {
            if (obj[prop] && obj[prop] !== '' && obj[prop] !== 0) { newObj[prop] = obj[prop] }
        })
        return newObj
    }

    resetFilter = () => {
        MobXStorage.AllFunds()
        this.props.onCloseModal()
    }


    render() {
        return (
            <React.Fragment>
                <FormControl>
                    <FormLabel>
                        Fund name
                    </FormLabel>
                    <Input
                        type="text"
                        value={this.state.name}
                        name="name"
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Manager address
                    </FormLabel>
                    <Input
                        type="text"
                        value={this.state.owner}
                        name="owner"
                        onChange={(e) => this.setState({ owner: e.target.value })}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Min value in BNB
                    </FormLabel>
                    <NumberInput
                        name='valueInETH'
                        value={this.state.valueInETH}
                        onChange={(value) => this.setState({ valueInETH: value })}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Min value in USD
                    </FormLabel>
                    <NumberInput
                        name='valueInUSD'
                        value={this.state.valueInUSD}
                        onChange={(value) => this.setState({ valueInUSD: value })}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Min profit in BNB
                    </FormLabel>
                    <NumberInput
                        name='profitInETH'
                        value={this.state.profitInETH}
                        onChange={(value) => this.setState({ profitInETH: value })}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Min profit in USD
                    </FormLabel>
                    <NumberInput
                        name="profitInUSD"
                        value={this.state.profitInUSD}
                        onChange={(value) => this.setState({ profitInUSD: value })}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl>
                    <FormLabel>Fund type</FormLabel>
                    <Select
                        as="select"
                        value={this.state.mainAsset}
                        onChange={(e) => this.setState({ mainAsset: e.target.value === "ALL" ? '' : e.target.value })}
                    >
                        <option>All</option>
                        <option>ETH</option>
                        <option>USD</option>
                    </Select>

                </FormControl>
                <FormControl>

                    <FormLabel>Time creation</FormLabel>
                    <Select
                        as="select"
                        value={this.state.timeCreation}
                        onChange={(e) => this.setState({ timeCreation: e.target.value === "ALL" ? '' : e.target.value })}
                    >
                        <option>All</option>
                        <option>Newest</option>
                        <option>Oldest</option>
                    </Select>
                </FormControl>

                <br />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button colorScheme="teal" variant="outline" onClick={() => this.multiFilter()}>Apply filter</Button>
                    <Button colorScheme="red" variant="outline"  onClick={() => this.resetFilter()}>Reset filter</Button>
                </Box>
            </React.Fragment>
        )
    }

}

export default inject('MobXStorage')(observer(FundFilter))
