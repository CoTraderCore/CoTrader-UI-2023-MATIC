import React, { useState, useEffect } from 'react';
import { SmartFundABIV7, APIEnpoint } from '../../config.js';
import setPending from '../../utils/setPending.js';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalBody,
  InputGroup,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  ModalCloseButton,
  Text,
  Checkbox,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react';
import { fromWei } from 'web3-utils';

function WithdrawManager(props) {
  const [isConvert, setIsConvert] = useState(false);
  const [managerCut, setManagerCut] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
        const contract = new props.web3.eth.Contract(SmartFundABIV7, props.smartFundAddress);
        let managerCut;
        try{
        const { fundManagerRemainingCut } = await contract.methods.calculateFundManagerCut().call();
        managerCut = parseFloat(fromWei(String(fundManagerRemainingCut)));
        }catch(e){
          managerCut=0;
        }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const withdrawManager = async () => {
    try {
      const contractABI = SmartFundABIV7;
      const contract = new props.web3.eth.Contract(contractABI, props.smartFundAddress);
      const block = await props.web3.eth.getBlockNumber();

      let txCount = await axios.get(APIEnpoint + 'api/user-pending-count/' + props.accounts[0]);
      txCount = txCount.data.result;

      contract.methods
        .fundManagerWithdraw()
        .send({ from: props.accounts[0] })
        .on('transactionHash', (hash) => {
          updatePendingStatus(txCount, block, hash);
        });
    } catch (e) {
      alert('Can not verify transaction data, please try again in a minute');
    }
  };

  const updatePendingStatus = (txCount, block, hash) => {
    props.pending(true, txCount + 1);
    setPending(props.smartFundAddress, 1, props.accounts[0], block, hash, 'Withdraw');
    onClose(true);
  };
  const allbtnBg = useColorModeValue("#30106b", "#7500FF")
  const sliderBg = useColorModeValue("#fff", "#181144")
  return (
    <>
      <Button flexGrow="1" minWidth={{ base: '100%', md: 'auto' }} bg={allbtnBg} color="#fff" sx={{ _hover: { backgroundColor: "#30108b" } }} onClick={onOpen}>
        Take cut
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={sliderBg}>
          <ModalHeader>Take cut from smart fund</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.version === 8 ? (
              <Text>Please update fund value</Text>
            ) : (
              <Text>Your current cut : {managerCut}</Text>
            )}
            {parseFloat(managerCut) > 0 || props.version > 7 ? (
              <FormControl>
                <InputGroup>
                  {props.version === 6 ? (
                    <Checkbox
                      colorScheme="red"
                      checked={isConvert}
                      onChange={() => setIsConvert(!isConvert)}
                    >
                      {`Try convert assets to ${props.mainAsset}`}
                    </Checkbox>
                  ) : null}
                </InputGroup>
                <Button mt={2} colorScheme="red" onClick={withdrawManager}>
                  Take cut
                </Button>
              </FormControl>
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WithdrawManager;
