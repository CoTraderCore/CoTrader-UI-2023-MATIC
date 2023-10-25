import { Box, useColorModeValue, useStyleConfig } from "@chakra-ui/react";
function CardBox(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });
// const cardBoxColor=useColorModeValue("gray.100","#181144")
const cardBoxColor=useColorModeValue("gray.100","gray.700")

  return (
    <Box __css={styles} {...rest}  bg={cardBoxColor}>
      {children}
    </Box>
  );
}

export default CardBox;