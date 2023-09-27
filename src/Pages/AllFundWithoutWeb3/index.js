import React,{ useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ShadowBox from '../../Components/Cards/ShadowBox'
import { Box, SimpleGrid, Heading, useColorModeValue, Tooltip, Button } from '@chakra-ui/react'
import IconBox from '../../Components/Icons/IconBox';
import { Icon } from '@chakra-ui/react';
import { MdAttachMoney } from 'react-icons/md'
import Card from '../../Components/Card/Card';
import FundModal from '../../Components/actions/FundModal';
import ManagerModal from '../../Components/actions/ManagerModal';
import EtherscanButton from '../../Components/actions/EtherscanButton';
import { fromWei } from 'web3-utils';
import PagePagination from '../../Components/navigation/Pagination/PagePagination';
import { inject } from 'mobx-react';


function AllFundWithoutWeb3(props) {

    const [currentPage, setCurrentPage] = useState(1)
    
    const navigate = useNavigate()
    const headingColor = useColorModeValue("#1B2559", "#F4F7FE");
    const brandColor = useColorModeValue("#422AFB", "##CBC3E3");
    const boxBg = useColorModeValue("#F4F7FE", "#110938");
    const tooltipBg = useColorModeValue("black", "#A4ADC7")
    const allbtnBg = useColorModeValue("#30106b", "#7500FF")

    return (
        <React.Fragment>
            <Box>
                {
                    props.MobXStorage.SmartFunds.map((item, key) =>
                        <Box key={item.address}>
                            <Box mt={4} sx={{ borderRadius: "10px", }}>
                                <Heading textTransform={"uppercase"} fontSize={{ base: "2xl" }} color={headingColor} textAlign={'center'} p={2}>{item.name}</Heading>
                                <SimpleGrid
                                    width="100%"
                                    columns={{ base: 1, md: 3, lg: 4, }}
                                    gap='20px'
                                    mb='20px'>
                                    <ShadowBox
                                        name='Type'
                                        value={item.fundType}
                                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                                    />
                                    <ShadowBox
                                        name='Core asset'
                                        value={item.mainAsset}
                                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                                    />
                                    <ShadowBox
                                        name='Version'
                                        value={String(item.version)}
                                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                                    />
                                    <ShadowBox
                                        name='Manager fee'
                                        value={Number(item.managerFee / 100).toFixed(2) + "%"}
                                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                                    />
                                    <ShadowBox
                                        name='Total Assets'
                                        value={
                                            // get total assets count
                                            (() => {
                                                if (item && item.balance && item.hasOwnProperty('balance')) {
                                                    try {
                                                        const addresses = JSON.parse(item.balance).map(i => i.address)
                                                        return addresses.length
                                                    } catch (e) {
                                                        return 0
                                                    }
                                                } else {
                                                    return 0
                                                }
                                            })()
                                        }
                                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                                    />
                                    <ShadowBox
                                        name='Active Assets'
                                        value={
                                            // get active assets count
                                            (() => {
                                                if (item && item.balance && item.hasOwnProperty('balance')) {
                                                    try {
                                                        const addresses = JSON.parse(item.balance).filter(i => i.percentInETH > 0)
                                                        return addresses.length
                                                    } catch (e) {
                                                        return 0
                                                    }
                                                } else {
                                                    return 0
                                                }
                                            })()
                                        }
                                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                                    />
                                    <ShadowBox
                                        name='Investors'
                                        value={
                                            // get total investors count
                                            (() => {
                                                if (item && item.shares && item.hasOwnProperty('shares')) {
                                                    try {
                                                        const investors = JSON.parse(item.shares).map(i => i.user)
                                                        return investors.length
                                                    } catch (e) {
                                                        return 0
                                                    }
                                                } else {
                                                    return 0
                                                }
                                            })()
                                        }
                                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                                    />
                                    <ShadowBox
                                        name='Trade Varification'
                                        value={Number(item.tradeVerification) === 1 ? "enabled" : "disabled"}
                                        shadow="1px 2px 3px 2px rgba(21,21,21,0.12)"
                                    />
                                </SimpleGrid>
                            </Box>

                            <SimpleGrid mt={5} gap={5} columns={{ base: 1, md: 2 }}>
                                <Card textAlign="center">
                                    <FundModal address={item.address} navigate={navigate} />
                                </Card>
                                <Card textAlign="center">
                                    <ManagerModal address={item.owner} navigate={navigate} />
                                </Card>
                            </SimpleGrid>



                            <Box mt={4} display="flex" justifyContent="center">
                                <Box justifyContent="center" gap={5} sx={{ display: "flex", flexDirection: { base: "column", sm: "column", md: "row" }, width: { base: "100%", md: "70%", lg: "70%" } }}>
                                    <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                                        <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                            Deposit
                                        </Button>
                                    </Tooltip>
                                    <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                                        <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                            Withdraw
                                        </Button>
                                    </Tooltip>
                                    <Tooltip hasArrow label="" bg={tooltipBg}>
                                        <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                            <NavLink to={"/web3off/fund/" + item.address}>Fund Page</NavLink>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip hasArrow label="Please Connect to web3" bg={tooltipBg}>
                                        <Button flexGrow="1" minWidth={{ base: '100%', sm: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }}>
                                            My Funds
                                        </Button>
                                    </Tooltip>
                                    <EtherscanButton address={item.address} />
                                </Box>
                            </Box>
                            <Box>
                                <SimpleGrid
                                    pt={5}
                                    width="100%"
                                    columns={{ base: 1, md: 2, lg: 4, }}
                                    gap='20px'
                                    mb='20px'>
                                    <ShadowBox
                                        startContent={
                                            <IconBox
                                                w='56px'
                                                h='56px'
                                                bg={boxBg}
                                                icon={
                                                    <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                                                }
                                            />
                                        }
                                        name='Fund profit in BNB'
                                        value={fromWei(String(item.profitInETH), 'ether')}
                                    />
                                    <ShadowBox
                                        startContent={
                                            <IconBox
                                                w='56px'
                                                h='56px'
                                                bg={boxBg}
                                                icon={
                                                    <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                                                }
                                            />
                                        }
                                        name='Fund profit in USD'
                                        value={fromWei(String(item.profitInUSD), 'ether')}
                                    />
                                    <ShadowBox
                                        startContent={
                                            <IconBox
                                                w='56px'
                                                h='56px'
                                                bg={boxBg}
                                                icon={<Icon w='28px' h='28px' as={MdAttachMoney} color={brandColor} />}
                                            />
                                        }
                                        name='Fund value in BNB'
                                        value={fromWei(String(item.valueInETH), 'ether')}
                                    />
                                    <ShadowBox
                                        startContent={
                                            <IconBox
                                                w='56px'
                                                h='56px'
                                                bg={boxBg}
                                                icon={<Icon w='28px' h='28px' as={MdAttachMoney} color={brandColor} />}
                                            />
                                        }
                                        name='Fund value in USD'
                                        value={fromWei(String(item.valueInUSD), 'ether')}
                                    />
                                </SimpleGrid>
                            </Box>
                        </Box>
                    )
                }
                {
                    !props.MobXStorage.FilterActive ? (
                        <PagePagination currentPage={currentPage} setCurrentPage={setCurrentPage} MobXStorage={props.MobXStorage} />
                    ) : (
                        null
                    )
                }
            </Box>
        </React.Fragment>
    )
}

// export default AllFundWithoutWeb3;
export default inject('MobXStorage')(AllFundWithoutWeb3)
