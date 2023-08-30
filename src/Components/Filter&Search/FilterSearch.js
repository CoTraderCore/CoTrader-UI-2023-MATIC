import React from 'react'
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue, useDisclosure,} from '@chakra-ui/react'
import FundFilter from '../navigation/FilterAndSearch/FundFilter'
import FundSearch from '../navigation/FilterAndSearch/FundSearch'


function FilterSearch() {
  const { isOpen, onOpen, onClose } = useDisclosure()


  const btnRef = React.useRef(null)
  const modalBg=useColorModeValue("white","#181144")
  return (
    <React.Fragment>
      <Box>
          <Button ref={btnRef} onClick={onOpen} bg="#7500fe" color={"#fff"} sx={{textTransform:"uppercase",width:{base:"100%",},_hover: { backgroundColor: "#7500FF" }}}>Filter Funds</Button>
      </Box>
      <Modal
      onClose={onClose}
      finalFocusRef={btnRef}
      isOpen={isOpen}
   
    >
      <ModalOverlay />
      <ModalContent style={{background:modalBg}}>
        <ModalHeader textTransform={"capitalize"}>Filter and search smart funds</ModalHeader>
        <ModalCloseButton/>
        <ModalBody >
        <Tabs variant='enclosed'>
        <TabList>
          <Tab>Filter</Tab>
          <Tab>Search</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FundFilter onCloseModal={onClose}/>
          </TabPanel>
          <TabPanel>
          <FundSearch onCloseModal={onClose}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
    </React.Fragment>
  )
}

export default FilterSearch
