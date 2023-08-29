import React from 'react'
import './Pending.css'
import { Box } from '@chakra-ui/react'

function Pending(props) {
  return (
    <React.Fragment>
    <Box className="lds-ellipsis"><Box></Box><Box></Box><Box></Box><Box></Box></Box>
    </React.Fragment>
  )
}

export default Pending
