import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';

type ButtonProps = {
  onPress?():void;
  type?: 'primary' | 'secondary'
}

const Button:FC<ButtonProps> = ({children, onPress = () => {}, type='primary'}) => {
  return (
    <TouchableOpacity onPress={onPress} 
      style={[styles[`${type}Background`], styles.button]}>
      <Text 
        style={[styles[`${type}Text`], styles.text]}
        >{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 8,
    padding: 16,
    marginVertical: 6
  },
  text: {
    fontSize:16
  },
  primaryBackground: {
    backgroundColor:'#0d66ff'
  },
  secondaryBackground: {
    backgroundColor:'transparent'
  },
  primaryText: {
    color: '#fff'
  },
  secondaryText: {
    color: '#040404'
  }
})

export default Button;