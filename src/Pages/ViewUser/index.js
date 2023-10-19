import React, { useEffect, useState } from 'react';
import getFundsList from '../../utils/getFundsList';
import { fromWei } from 'web3-utils'
import { Alert, Box, Text, Table, Thead, Tbody, Tr, Td, Th, useColorModeValue, SimpleGrid, Icon, AlertIcon, Link } from '@chakra-ui/react';
import { NavLink, useParams } from 'react-router-dom';
import { EtherscanLink } from '../../config';
import Card from '../../Components/Card/Card';
import ShadowBox from '../../Components/Cards/ShadowBox';
import { MdOutlineBarChart } from 'react-icons/md'
import { FcComboChart } from 'react-icons/fc'
import { RiFundsBoxLine } from 'react-icons/ri'
import IconBox from '../../Components/Icons/IconBox';
import Header from '../../Components/common/Header';

function ViewUser() {
   
    const { address } = useParams()

    const [userFunds, setUserFunds] = useState([]);
    const [userFundsAddresses, setUserFundsAddresses] = useState([]);
    const [userFundsNames, setUserFundsNames] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const initData = async () => {
            // get funds
            const smartFunds = await getFundsList()
            // filter user funds
            const userFunds = smartFunds.filter(
                fund => fund.owner.toLowerCase().includes(String(address).toLowerCase())
            );
            // continue if user exist
            if (userFunds.length > 0) {
                const reducer = (accumulator, currentValue) => Number(accumulator) + Number(currentValue);
                // get value
                const value = userFunds.map(fund => Number(fromWei(fund.valueInUSD)));
                const totalValue = Number(value.reduce(reducer)).toFixed(2);
                // get profit
                const profit = userFunds.map((fund) => {
                    return fund.profitInUSD > 0 ? Number(fromWei(fund.profitInUSD)) : 0;
                });
                const totalProfit = Number(profit.reduce(reducer)).toFixed(2);
                // get all user funds addresses
                const userFundsAddresses = userFunds.map(fund => fund.address);
                const userFundsNames = userFunds.map(fund => fund.name);


                if (isMounted) {
                    setUserFunds(userFunds);
                    setTotalValue(totalValue);
                    setTotalProfit(totalProfit);
                    setUserFundsAddresses(userFundsAddresses);
                    setUserFundsNames(userFundsNames);
                }
            }
        }

        initData();

        return () => {
            isMounted = false;
        };
    }, [address]);

    const addressColor = useColorModeValue("#7500FF", "#fff")
    const brandColor = useColorModeValue("#422AFB", "##CBC3E3");
    const boxBg = useColorModeValue("#F4F7FE", "#110938");

    return (
        <React.Fragment>
            {
                userFunds.length > 0 ?
                    (
                        <Box p={5}>
                        <Header heading="View User"/>
                            <Text pb={2} mt={5} flexDirection={{ base: "column", md: "row" }} sx={{ fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                Info for user address:-
                                &nbsp;<small>
                                    <Link fontSize={{ base: "10px", md: "12px" }} sx={{ fontWeight: "500", _hover: { textDecoration: "underline" }, color: addressColor, }} href={EtherscanLink + "address/" + address} target="_blank" rel="noopener noreferrer">
                                        {address}
                                    </Link>
                                </small>
                            </Text>

                            <hr />
                            <strong>
                                <SimpleGrid
                                    width="100%"
                                    columns={{ base: 1, md: 3, lg: 3, }}
                                    gap='20px'
                                    mb={5}
                                    mt={5}
                                >
                                    <ShadowBox
                                        startContent={
                                            <IconBox
                                                w='56px'
                                                h='56px'
                                                bg={boxBg}
                                                icon={
                                                    <Icon w='32px' h='32px' as={MdOutlineBarChart} color={brandColor} />
                                                }
                                            />
                                        }
                                        name='Total value'
                                        value={`$ ${totalValue}`}
                                    />
                                    <ShadowBox
                                        startContent={
                                            <IconBox
                                                w='56px'
                                                h='56px'
                                                bg={boxBg}
                                                icon={
                                                    <Icon w='32px' h='32px' as={RiFundsBoxLine} color={brandColor} />
                                                }
                                            />
                                        }
                                        name='Total Profit'
                                        value={`$ ${totalProfit}`}
                                    />
                                    <ShadowBox
                                        startContent={
                                            <IconBox
                                                w='56px'
                                                h='56px'
                                                bg={boxBg}
                                                icon={
                                                    <Icon w='32px' h='32px' as={FcComboChart} color={brandColor} />
                                                }
                                            />
                                        }
                                        name='Total Fund'
                                        value={userFunds.length}
                                    />
                                </SimpleGrid>
                            </strong>
                            <Card p={5} className='table-box'
                                direction='column'>
                                <Table >
                                    <Thead>
                                        <Tr>
                                            <Th>#</Th>
                                            <Th>Fund name</Th>
                                            <Th>Address</Th>
                                            <Th>Value in USD</Th>
                                            <Th>Profit in USD</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {userFunds.map((fund, key) => {
                                            key++;
                                            return (
                                                <Tr key={key}>
                                                    <Td>{key}</Td>
                                                    <Td>{fund.name}</Td>
                                                    <Td><NavLink to={'/fund/' + fund.address}>{fund.address}</NavLink></Td>
                                                    <Td>{fromWei(String(fund.valueInUSD))}</Td>
                                                    <Td>{fromWei(String(fund.profitInUSD))}</Td>
                                                </Tr>
                                            )
                                        })}
                                    </Tbody>
                                </Table>
                            </Card>
                        </Box>
                    ) :
                    (
                        <Box >
                            <Alert flexDirection={{ base: "column", md: "row" }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} status="warning" textAlign="center">
                                <AlertIcon />
                                <Text fontWeight="500" fontSize={{ base: "12px", md: "14px" }}>
                                    Can't find data for this <small style={{ color: addressColor }}>{address}</small> address
                                </Text>
                            </Alert>
                        </Box>
                    )
            }




        </React.Fragment>
    )
}

export default ViewUser;

export const eventloader = () => {
    console.log("data loding....");
    return null;
  }