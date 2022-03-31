import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet, TextStyle} from 'react-native';
import Text from '../Text';

type ButtonProps = {
  onPress?():void;
  type?: 'primary' | 'secondary' | 'danger',
  size?: 'big' | 'medium' | 'small',
  useSpacing?: boolean;
  buttonStyle?: TextStyle;
}

const Button:FC<ButtonProps> = ({
  children,
  onPress = () => {},
  type = 'primary',
  size = 'medium',
  useSpacing = true,
  buttonStyle,
}) => {
  return (
    <TouchableOpacity accessibilityRole="button" onPress={onPress}
      style={[
        styles[`${type}Background`],
        styles[`${size}Button`],
        styles.button,
        {
          marginVertical: useSpacing ? 6 : 0,
        },
        buttonStyle,
        ]}>
      <Text
        style={[styles[`${type}Text`], styles[`${size}Text`], styles.text]}
        >{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {

  },

  primaryBackground: {
    backgroundColor:'#0d66ff',
  },
  secondaryBackground: {
    backgroundColor:'transparent',
  },
  dangerBackground: {
    backgroundColor: 'rgb(255,88,88)',
  },
  bigButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  mediumButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bigText: {
    fontSize: 18,
  },
  mediumText: {
    fontSize: 16,
  },
  smallText: {
    fontSize: 14,
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#040404',
  },
  dangerText: {
    color: '#fff',
  },
});

export default Button;
