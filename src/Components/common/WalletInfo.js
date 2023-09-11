import React, { useState, useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { fromWei } from 'web3-utils'
import Card from '../Card/Card'



const WalletInfo = (props) => {
    const [ETHBalance, setETHBalance] = useState(0);

    useEffect(() => {
        setTimeout(async () => {
            if (props.accounts && props.web3) {
                const ETHBalance = parseFloat(fromWei(await props.web3.eth.getBalance(props.accounts[0]))).toFixed(4)
                setETHBalance({ ETHBalance })
            }
        }, 1000)
    }, [])

    return (
        <Box px={4} py={1}>
            {
                props.accounts && props.web3 ?
                    (
                        <Card>
                            <Box style={{ lineHeight: '1.3', textAlign: 'center' }}>
                                {
                                    ETHBalance > 0 ?
                                        (
                                            <Text>
                                                <strong>{ETHBalance}: BNB</strong>
                                            </Text>
                                        ) : null
                                }
                                <Text><strong style={{ color: "#5E39FF", fontWeight: "500", }}>{String(props.accounts).replace(String(props.accounts[0]).substring(6, 36), "...")}</strong></Text>
                            </Box>
                        </Card>
                    ) : (
                        null
                    )
            }

        </Box>
    )
}

export default WalletInfo
