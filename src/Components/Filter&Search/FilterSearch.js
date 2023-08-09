import React from 'react'
import { Box, Button,} from '@chakra-ui/react'


function FilterSearch() {
  return (
    <React.Fragment>
      <Box>
          <Button bg="#4318ff" color={"#fff"} sx={{textTransform:"uppercase",width:{base:"100%",},_hover: { backgroundColor: "#4318ffcc" }}}>Filter Funds</Button>
      </Box>
    </React.Fragment>
  )
}

export default FilterSearch
