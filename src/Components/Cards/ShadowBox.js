// Chakra imports
// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import CardBox from "./CardBox";
// Custom components
// import Card from "components/card/Card.js";
// Custom icons
import React from "react";

export default function ShadowBox(props) {
  const { startContent, endContent, name, growth, value ,shadow,} = props;
  const textColor = useColorModeValue("#A4ADC7", "white");
  const textColorSecondary =useColorModeValue("gray", "#CBC3E3");
 
  return (
    <CardBox py='15px' shadow={shadow} >
      <Flex
        my='auto'
        h='100%'
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}>
        {startContent}

        <Stat my='auto' ms={startContent ? "18px" : "0px"} >
          <StatLabel
            lineHeight='100%'
            color={textColorSecondary}
            fontWeight={"700"}
            fontSize={{
              base: "md",
            }}>
            {name}
          </StatLabel>
          <StatNumber
            color={textColor}
            fontSize={{
              base: "12px",md:"12px"
            }}>
            {value}
          </StatNumber>
          {growth ? (
            <Flex align='center'>
              <Text color='green.500' fontSize='xs' fontWeight='700' me='5px'>
                {growth}
              </Text>
              <Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
                since last month
              </Text>
            </Flex>
          ) : null}
        </Stat>
        <Flex ms='auto' w='max-content'>
          {endContent}
        </Flex>
      </Flex>
    </CardBox>
  );
}

