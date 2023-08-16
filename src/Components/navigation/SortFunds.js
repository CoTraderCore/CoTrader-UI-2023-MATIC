import React from 'react'
import { FormControl, Select, useColorModeValue } from "@chakra-ui/react"
import { inject, observer } from 'mobx-react'

const changeHandler = (props, expression) => {
    switch (expression) {
        case "Higher value":
            props.MobXStorage.sortFundsByHigherValue()
            break;

        case "Lower value":
            props.MobXStorage.sortFundsByLowerValue()
            break;

        case "Higher profit":
            props.MobXStorage.sortFundsByHigherProfit()
            break;

        case "Lower profit":
            props.MobXStorage.sortFundsByLowerProfit()
            break;

        case "Higher ROI":
            props.MobXStorage.sortFundsByHigherROI()
            break;

        case "Lower ROI":
            props.MobXStorage.sortFundsByLowerROI()
            break;

        default:
            alert("Wrong sort command")
    }
}

const SortFunds = ((props) => {
    const selectColor = useColorModeValue("#000", "red")
    return (
        <FormControl onChange={(e) => changeHandler(props, e.target.value)}>
            <Select placeholder='Short by' sx={{ fontWeight: "500" ,textTransform:"uppercase"}}>
                <option style={{ color: "black" }} >Higher value</option>
                <option style={{ color: "black" }}>Lower value</option>
                <option style={{ color: "black" }}>Higher profit</option>
                <option style={{ color: "black" }}>Lower profit</option>
                <option style={{ color: "black" }}>Higher ROI</option>
                <option style={{ color: "black" }}>Lower ROI</option>
            </Select>
        </FormControl>
    )
})
// export default SortFunds
export default inject('MobXStorage')(observer(SortFunds))
