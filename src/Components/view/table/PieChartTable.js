import React, { useEffect, useState } from 'react'
import { Box, Table, Thead, Tbody, Tr, Td, Th, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import UserInfo from '../../template/UserInfo';
import getFundData from '../../../utils/getFundData';
import { EtherscanLink } from '../../../config';
import { fromWeiByDecimalsInput } from '../../../utils/weiByDecimals';

function PieChartTable() {


  const headingColor = useColorModeValue("#1B2559", "#F4F7FE");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const headerColor = useColorModeValue("#1B2559", "#CBC3E3");

  const address = "0x36BDe6F520613Ce99dAC0b255492c533Ca3Dd8e0"
  const [fundData, setFundData] = useState({
    smartFundAddress: '',
    name: '',
    balance: [],
    owner: '',
    profitInETH: '0',
    profitInUSD: '0',
    valueInETH: '0',
    valueInUSD: '0',
    managerTotalCut: '0',
    managerRemainingCut: '0',
    shares: [],
    isDataLoad: false,
    mainAsset: '',
    tradeVerification: 0,
    fundSizeType: 'light',
    version: 0,
    managerFee: 0
  });
  useEffect(() => {
    const getInitialData = async () => {
      const fund = await getFundData(address)
      setFundData({
        smartFundAddress: fund?.data?.result?.address || "",
        name: fund?.data?.result?.name,
        balance: JSON.parse(fund?.data?.result?.balance || "[]"),
        owner: fund?.data?.result?.owner,
        profitInETH: fund?.data?.result?.profitInETH,
        profitInUSD: fund?.data?.result?.profitInUSD,
        valueInETH: fund?.data?.result?.valueInETH,
        valueInUSD: fund?.data?.result?.valueInUSD,
        managerTotalCut: fund?.data?.result?.managerTotalCut,
        managerRemainingCut: fund?.data?.result?.managerRemainingCut,
        shares: fund?.data?.result?.shares,
        mainAsset: fund?.data?.result?.mainAsset,
        isDataLoad: true,
        tradeVerification: fund?.data?.result?.tradeVerification,
        fundSizeType: fund?.data?.result?.fundType || "",
        managerFee: fund?.data?.result?.managerFee,
        version: fund?.data?.result?.version
      })

    }
    getInitialData()

  }, [address])

  // helper for parse pool connectors data
  const parsePoolConnectors = (data) => {
    const poolConnectors = data.map((item) => item.symbol)
    return (
      <UserInfo info={`Pool tokens : ${poolConnectors}`} />
    )
  }

  return (

    <Box direction='column'
      w={{base:"100%",md:"60%"}}
      px='0px'
      overflowX={{ base: "scroll", md: "hidden" }}>
      <Flex px='25px' justify='space-between' align='center'>
        <Text
          color={headingColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          FUND VALANCE
        </Text>
      </Flex>
      <Table style={{ textAlign: "left", width: "100%" }}>
        <Thead style={{ color: "grey" }}>
          <Tr >
            <Th color={headerColor}>Token</Th>
            <Th color={headerColor} >% from fund</Th>
            <Th color={headerColor}>Value in BNB</Th>
            <Th color={headerColor}>Balance</Th>
          </Tr>
        </Thead>
        {
          fundData.balance.length > 0 ?
            (
              <Tbody style={{ color: "grey",}} fontSize={{base:"12px",sm:"14px",md:"auto"}} >
                {
                  fundData.balance.slice().sort(function (a, b) {
                    return Number(b.percentInETH) - Number(a.percentInETH)
                  }).map((item, key) => {
                    if (item["percentInETH"] > 0) {
                      return (
                        <Tr key={key}>
                          <Td sx={{ display: "flex",flexDirection:{base:"column",md:"row"}, color: { textColor }, fontWeight: "500" }}>
                            {
                              <img
                                style={{ height: "20px", width: "20px",}}
                                src={`https://tokens.1inch.exchange/${String(item["address"]).toLowerCase()}.png`}
                                alt="Logo"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://etherscan.io/images/main/empty-token.png" }} />
                            }
                            &nbsp;
                            {<a href={EtherscanLink + "token/" + item["address"]} target="_blank" rel="noopener noreferrer">{item["symbol"]}</a>}
                            &nbsp;
                            {
                              item["tokensAdditionalData"].length > 0
                                ?
                                (
                                  <>
                                    {parsePoolConnectors(item["tokensAdditionalData"])}
                                  </>
                                ) : null
                            }
                          </Td>

                          <Td>
                            {item["percentInETH"] > 0 ? Number(item["percentInETH"]).toFixed(4) : 0} %
                          </Td>

                          <Td>
                            {item["assetValueInETHFromWei"] > 0 ? Number(item["assetValueInETHFromWei"]).toFixed(6) : 0}
                          </Td>

                          <Td>
                            {Number(fromWeiByDecimalsInput(item["decimals"], item["balance"].toString())).toFixed(4)}
                          </Td>
                        </Tr>
                      )
                    }
                    else {
                      return null
                    }
                  }
                  )
                }
              </Tbody>
            )
            :
            (
              <p>No assets in this fund</p>
            )
        }
      </Table>
    </Box>

  )

}

export default PieChartTable;
