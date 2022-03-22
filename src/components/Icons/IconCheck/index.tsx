import React, { FC } from "react";
import { AntDesign } from '@expo/vector-icons'
import { ColorValue, StyleProp, TextStyle } from "react-native";

type IconCheckProps = {
  style?: StyleProp<TextStyle>;
  color: ColorValue
}

const IconCheck:FC<IconCheckProps> = ({style, color}) => {
  return (
    <AntDesign name="check" size={18} color={color} style={style}/>
  )
}

export default IconCheck;