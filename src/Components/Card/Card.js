import { Box, useColorModeValue, useStyleConfig } from "@chakra-ui/react";
function Card(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });
const cardBg=useColorModeValue("#fff","#181144")
  return (
    <Box __css={styles} {...rest} bg={cardBg}>
      {children}
    </Box>
  );
}

export default Card;
