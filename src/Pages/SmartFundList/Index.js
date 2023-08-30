import React, { useEffect, useState, useRef } from 'react'
import DashboardHeader from '../../Components/common/DashboardHeader';
import CardBox from '../../Components/Cards/CardBox';
import { Box, Grid, GridItem, Icon, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import CreateNewFund from '../../Components/actions/CreateNewFund';
import FilterSearch from '../../Components/Filter&Search/FilterSearch';
import SortFunds from '../../Components/navigation/SortFunds';
import IconBox from '../../Components/Icons/IconBox';
import Footer from '../../Components/common/footer/Footer';
import MobXStorage from '../../MobXStorage';
import Loading from '../../Components/template/spiners/Loading';
import HorizontalTabs from '../../Components/Tabs/HorizontalTabs';
import { smartfundlist } from '../../utils/sample';
import { MdOutlineBarChart } from 'react-icons/md'
import { FcComboChart } from 'react-icons/fc'
import { RiFundsBoxLine } from 'react-icons/ri'
import ShadowBox from '../../Components/Cards/ShadowBox';
import PopupMsg from '../../Components/template/PopupMsg';
import axios from 'axios';
import { io } from 'socket.io-client';
import { APIEnpoint } from '../../config';
import getFundData from '../../utils/getFundData';
import getFundsList from '../../utils/getFundsList';
import Pending from '../../Components/template/spiners/Pending';

function SmartFundList(props) {

  const _popupChild = useRef(null);

  const [pending, setPending] = useState(false);
  const [txName, setTxName] = useState('');
  const [txHash, setTxHash] = useState('');
  const [lastHash, setLastHash] = useState('');
  const [txCount, setTxCount] = useState(0);

  const _isMounted = useRef(true);

  useEffect(() => {
    const initSocket = () => {
      const socket = io(APIEnpoint);
      socket.on('connect', () => {
        socket.on('AddedNewSmartFund', (address, hash, user) => {
          txUpdate('added new fund', address, user, hash);
        });

        socket.on('Deposit', (address, hash, user) => {
          txUpdate('deposit', address, user, hash);
        });

        socket.on('Withdraw', (address, hash, user) => {
          txUpdate('withdraw', address, user, hash);
        });
      });
    };

    const updateSFList = async () => {
      const smartFunds = await getFundsList();
      MobXStorage.initSFList(smartFunds);
      checkPending();
    };

    const updateSingleSF = async (address) => {
      checkPending();
      const fund = await getFundData(address);
      if (_popupChild.current) {
        _popupChild.current.UpdateValue(
          fund.data.result.profitInETH,
          fund.data.result.profitInUSD,
          fund.data.result.valueInETH,
          fund.data.result.valueInUSD
        );
      }
    };

    const pending = (_bool, _txCount) => {
      setPending(_bool);
      setTxCount(_txCount);
    };

    const checkPending = async () => {
      if (props.accounts) {
        let txCount = await axios.get(APIEnpoint + 'api/user-pending-count/' + props.accounts[0]);
        txCount = txCount.data.result;
        const pending = Number(txCount) === 0 ? false : true;
        if (_isMounted.current) {
          setPending(pending);
          setTxCount(txCount);
        }
      }
    };

    const showPopup = () => {
      if (_popupChild.current) {
        _popupChild.current.show();
      }
    };

    const txUpdate = (txName, address, user, hash) => {
      if (MobXStorage.account[0] === user && lastHash !== hash) {
        if (_isMounted.current) {
          setLastHash(hash);
          setTxName(txName);
          setTxHash(hash);
          checkPending();

          if (txName === 'added new fund') {
            updateSFList();
          } else {
            updateSingleSF(address);
          }

          showPopup();
        }
      }
    };

    _isMounted.current = true;
    initSocket();
    checkPending();

    return () => {
      _isMounted.current = false;
    };
  }, [props.accounts, MobXStorage]);


  const brandColor = useColorModeValue("#7500fe", "##CBC3E3");
  const boxBg = useColorModeValue("#F4F7FE", "#110938");
  return (
    <React.Fragment>
      <Box className='dashboard' style={{ padding: "10px", }}>
        <GridItem my={5} sx={{ fontWeight:"500",textAlign:"center", borderRadius: "5px", padding: "10px 5px", boxShadow: "1px 1px 1px 1px gray", border: "1px solid white" }}>
          DeFi investment funds - create or join the best smart funds on the blockchain
        </GridItem>
        <PopupMsg txName={txName} txHash={txHash} ref={_popupChild} />
        {
          pending ? (
            <>
              <Box>
                <small style={{ fontWeight:"500",textAlign:"center", borderRadius: "5px", padding: "10px 5px", boxShadow: "1px 1px 1px 1px gray", border: "1px solid white" }}>
                  Pending transitions : {txCount}
                </small>
                <Pending />
              </Box>
            </>
          ) :
            (null)
        }
        <CardBox p="10px" my="10px">
          <Grid gap={4} templateColumns={['1fr', 'repeat(3, 1fr)']} sx={{ padding: "10px 0px ", borderRadius: "5px", display: "flex", justifyContent: "space-around", flexDirection: { base: "column", sm: "column", md: "row" }, textAlign: { base: "center", sm: "center" } }}>
            <GridItem >
              <CreateNewFund web3={props.web3} accounts={props.accounts} pending={pending} />
            </GridItem>
            <GridItem >
              <FilterSearch />
            </GridItem>
            <GridItem >
              <Stack bg="#7500fe" sx={{ color: "#fff", borderRadius: "8px", border: "none", _hover: { backgroundColor: "#7500FF" } }}>
                <SortFunds />
              </Stack>
            </GridItem>
          </Grid>
        </CardBox>
        <Box>


          {
            !MobXStorage.FilterActive ?
              (
                <SimpleGrid
                  width="100%"
                  columns={{ base: 1, md: 4, lg: 4, }}
                  gap='20px'
                  mb='20px'>
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
                    name='Total Funds'
                    value={MobXStorage?.SmartFundsOriginal.length}
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
                    name='Total value'
                    value={`$ ${MobXStorage?.TotalValue}`}
                  />
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
                    name='Total profit'
                    value={`$ ${MobXStorage?.TotalProfit}`}
                  />
                  <ShadowBox
                    startContent={
                      <IconBox
                        w='56px'
                        h='56px'
                        bg={boxBg}
                        icon={<Icon w='28px' h='28px' as={MdOutlineBarChart} color={brandColor} />}
                      />
                    }
                    name='History total profit'
                    value={`$ ${MobXStorage?.HistoryTotalProfit}`}
                  />
                </SimpleGrid>
              ) :
              (
                <Box>
                  <Text style={{ color: "green" }}>{MobXStorage?.FilterInfo}</Text>
                  <SimpleGrid
                    width="100%"
                    columns={{ base: 1, md: 4, lg: 4, }}
                    gap='20px'
                    mb='20px'>
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
                      name='Fund'
                      value={`${MobXStorage?.SmartFunds.length} of ${MobXStorage?.SmartFundsOriginal.length} funds`}
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
                      name='Total value'
                      value={`$ ${MobXStorage?.userTotalValue}`}
                    />
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
                      name='Total profit'
                      value={`$ ${MobXStorage?.TotalProfit}`}
                    />
                    <ShadowBox
                      startContent={
                        <IconBox
                          w='56px'
                          h='56px'
                          bg={boxBg}
                          icon={<Icon w='28px' h='28px' as={MdOutlineBarChart} color={brandColor} />}
                        />
                      }
                      name='History total profit'
                      value={`$ ${MobXStorage?.HistoryTotalProfit}`}
                    />
                  </SimpleGrid>
                </Box>
              )
          }




        </Box>

        <SimpleGrid>
          <HorizontalTabs data={smartfundlist} pending={pending} />
        </SimpleGrid>
      </Box>
      <Footer />
    </React.Fragment>
  );

}

export default SmartFundList;
