import React, { Component } from 'react'
import { Tooltip, Box, } from '@chakra-ui/react'


class UserInfo extends Component {
  render() {
    return (
      <Box>
        <Tooltip hasArrow label={this.props.info} bg='red.600'>
          <small style={{background:"#00C6C0",padding:"1px 10px",borderRadius:"5px",marginLeft:"5px",color:"white"}}>Info</small>
        </Tooltip>
      </Box>
    )
  }
}

export default UserInfo
