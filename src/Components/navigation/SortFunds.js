import React from 'react'
import { FormControl, Select } from "@chakra-ui/react"
import { inject, observer } from 'mobx-react'

function changeHandler(props, expression) {
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

const SortFunds = (props) => {
    return (
        <FormControl onChange={(e) => changeHandler(props, e.target.value)}>
            <Select sx={{ fontWeight: "500", textTransform: "uppercase" }}>
                <option style={{ color: "black" }} value="Higher value">Higher value</option>
                <option style={{ color: "black" }} value="Lower value">Lower value</option>
                <option style={{ color: "black" }} value="Higher profit">Higher profit</option>
                <option style={{ color: "black" }} value="Lower profit">Lower profit</option>
                <option style={{ color: "black" }} value="Higher ROI">Higher ROI</option>
                <option style={{ color: "black" }} value="Higher ROI">Lower ROI</option>
            </Select>
        </FormControl>
    ) 
}
// export default SortFunds;
export default inject('MobXStorage')(observer(SortFunds));