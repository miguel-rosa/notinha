import React, { FC } from "react";
import { StyleProp, TextStyle, Text as RNText} from "react-native";

type TextProps = {
  style?: StyleProp<TextStyle>;
  weight?: "500" | "700",
  fontSize?: number
}

const Text:FC<TextProps> = ({style, weight="500", children, fontSize}) => {
  const fontWeight = {
    "700": "Poppins_700Bold", 
    "500": "Poppins_500Medium"
  }
  return (
    <RNText style={[
      {
        fontFamily: fontWeight[weight],
        fontSize: fontSize
      },
      style
    ]}>
      {children}
    </RNText>
  )
}


export default Text;