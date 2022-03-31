import React, {FC} from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, TextStyle } from 'react-native';

type IconFavoriteProps = {
  fill?: boolean
  onPress?():void;
  style?: StyleProp<TextStyle>
}

const IconFavorite:FC<IconFavoriteProps> = ({fill, style, onPress}) => {
  return fill ? (
    <FontAwesome name="heart" size={24} color="black" onPress={onPress}/>
  ) :
  (
    <FontAwesome name="heart-o" size={24} color="black" onPress={onPress}/>
  );
};

export default IconFavorite;
