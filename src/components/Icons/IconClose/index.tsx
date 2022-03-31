import React, {FC} from 'react';
import {Ionicons} from '@expo/vector-icons';
import { StyleProp, TextStyle } from 'react-native';

type IconCloseProps = {
  onPress():void;
  style?: StyleProp<TextStyle>
}

const IconClose:FC<IconCloseProps> = ({style, onPress}) => {
  return (
    <Ionicons size={24} style={style} name="md-close" color="black" onPress={onPress}/>
  );
};

export default IconClose;
