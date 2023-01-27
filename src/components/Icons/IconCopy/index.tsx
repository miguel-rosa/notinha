import React, {FC} from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleProp, TextStyle } from 'react-native';

type IconCopyProps = {
  fill?: boolean
  onPress?():void;
  style?: StyleProp<TextStyle>
}

const IconCopy:FC<IconCopyProps> = ({fill, style, onPress}) => {
  return  (
    <FontAwesome5 name="copy" size={24} color="black" onPress={onPress}/>
  );
};

export default IconCopy;
