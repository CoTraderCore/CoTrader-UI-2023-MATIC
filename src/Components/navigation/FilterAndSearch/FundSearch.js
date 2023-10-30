import React, { useState } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

function FundSearch(props) {
    const [userAddress, setUserAddress] = useState('');

    return (
                    <React.Fragment>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="auto"
                                cursor="pointer"
                                children={<Link to={"/user/" + userAddress}><SearchIcon color="gray.300" /></Link>}
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
    );
}

export default inject('MobXStorage')(observer(FundSearch));
