import React, { Component } from 'react'
// import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap"
import { Tooltip, Box, Button } from '@chakra-ui/react'


class UserInfo extends Component {
  render() {
    return (
      <Box>
        <Tooltip hasArrow label={this.props.info} bg='red.600'>
          <Button>Info</Button>
        </Tooltip>
      </Box>
    )
  }
}

export default UserInfo
