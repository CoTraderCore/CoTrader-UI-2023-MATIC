import { mode } from "@chakra-ui/theme-tools";
const Card = {
  baseStyle: (props) => {
    return {
    p: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent : "center",
    width: "100%",
    position: "relative",
    borderRadius: "20px",
    minWidth: "0px",
    wordWrap: "break-word",
    bg: mode("#fff", "#A4ADC7")(props),
    backgroundClip: "border-box",
  }},
};

export const CardComponent = {
  components: {
    Card,
  },
};