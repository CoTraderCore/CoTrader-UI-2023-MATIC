import { Box, useStyleConfig } from "@chakra-ui/react";
function CardBox(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });

  return (
    <Box __css={styles} {...rest} >
      {children}
    </Box>
  );
}

export default CardBox;