import React, { useState } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { inject, Observer } from 'mobx-react';

function FundSearch(props) {
    const [userAddress, setUserAddress] = useState('');

    return (
        <Observer>
            {() => {
                return (
                    <React.Fragment>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="auto"
                                cursor="pointer"
                                children={<NavLink to={"/user/" + userAddress}><SearchIcon color="gray.300" /></NavLink>}
                            />
                            <Input
                                type="search"
                                placeholder="Search total data for user address"
                                value={userAddress}
                                onChange={e => setUserAddress(e.target.value)}
                                borderColor="gray.300"
                                focusBorderColor="blue.500"
                            />
                        </InputGroup>
                    </React.Fragment>
                )
            }}
        </Observer>
    );
}

export default inject('MobXStorage')(FundSearch);
