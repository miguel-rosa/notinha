import React, { FC } from "react";
import { AntDesign } from '@expo/vector-icons'
import { StyleProp, TextStyle } from "react-native";

type IconCheckProps = {
  style?: StyleProp<TextStyle>
}

const IconCheck:FC<IconCheckProps> = ({style}) => {
  return (
    <AntDesign name="check" size={18} color="black" style={style}/>
  )
}

export default IconCheck;