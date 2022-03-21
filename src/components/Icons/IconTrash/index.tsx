import React, {FC} from "react";
import {Feather} from '@expo/vector-icons'
import { StyleProp, TextStyle } from "react-native";

type IconTrashProps = {
  onPress():void;
  style?: StyleProp<TextStyle>
}

const IconTrash:FC<IconTrashProps>= ({style, onPress}) => {
  return (
    <Feather name="trash-2" size={24} color="black" onPress={onPress}/>
  )
}

export default IconTrash;