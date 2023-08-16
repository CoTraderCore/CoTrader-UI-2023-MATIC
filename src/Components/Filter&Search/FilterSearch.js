import React from 'react'
import { Box, Button,} from '@chakra-ui/react'


function FilterSearch() {
  return (
    <React.Fragment>
      <Box>
          <Button bg="#5E39FF" color={"#fff"} sx={{textTransform:"uppercase",width:{base:"100%",},_hover: { backgroundColor: "#7500ff" }}}>Filter Funds</Button>
      </Box>
    </React.Fragment>
  )
}

export default FilterSearch
