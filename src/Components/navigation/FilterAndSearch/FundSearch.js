import React, { Component } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

class FundSearch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          userAddress: ''
        }
    }

    redirectToUserPage() {
        window.location = "/#/user/" + this.state.userAddress;
        this.props.onCloseModal()
    }

    render() {
        return (
            <React.Fragment>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="auto" 
                        cursor="pointer"
                        children={<SearchIcon color="gray.300"  onClick={() => this.redirectToUserPage()}/>}
                    />
                    <Input
                        type="search"
                        placeholder="Search total data for user address"
                        value={this.state.userAddress}
                        onChange={e => this.setState({ userAddress: e.target.value })}
                        borderColor="gray.300"
                        focusBorderColor="blue.500"
                    />
                </InputGroup>
            </React.Fragment>
        );
    }
}

export default FundSearch;
