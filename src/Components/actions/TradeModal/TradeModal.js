import React, { useState, useEffect } from 'react';
import {
  SmartFundABIV7,
} from '../../../config.js';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react';

import SetGasPrice from '../../Settings/SetGasPrice.js';

// trade modals
import TradeViaQuickSwap from './TradeViaQuickSwap.js';


function TradeModal(props) {
  const [exchangePortalAddress, setExchangePortalAddress] = useState('');

  useEffect(() => {
    let isMounted = true;

    const initData = async () => {
      const smartFund = new props.web3.eth.Contract(SmartFundABIV7, props.smartFundAddress);
      const exchangePortalAddress = await smartFund.methods.exchangePortal().call();
      if (isMounted) {
        setExchangePortalAddress(exchangePortalAddress);
      }
    };

    initData();

    return () => {
      isMounted = false;
    };
  }, [props.smartFundAddress, props.web3]);


  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalbg = useColorModeValue("#fff", "gray.700")
  const allbtnBg = useColorModeValue("#039be5", "#039be5")

  return (
    <>
      <Button flexGrow="1" width={{ base: "100%", md: "auto" }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#027CB8" } }} onClick={onOpen}>
        Exchange
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "lg", md: "2xl" }}>
        <ModalOverlay />
        <ModalContent bg={modalbg}>
          <ModalHeader>Exchange</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs defaultIndex={0}>
              <TabList>
                <Tab>QuickSwap</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TradeViaQuickSwap
                    web3={props.web3}
                    accounts={props.accounts}
                    smartFundAddress={props.smartFundAddress}
                    pending={props.pending}
                    version={props.version}
                    exchangePortalAddress={exchangePortalAddress}
                    closeModal={onClose}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
            {/* Update gas price */}
            <br />
            {props.web3 ? <SetGasPrice web3={props.web3} /> : null}
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}

export default TradeModal;
