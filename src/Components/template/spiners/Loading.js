import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

function Loading() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "90vh" }}>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='#7500FF'
        size='xl'
      />
    </Box>
  )
}

export default Loading
