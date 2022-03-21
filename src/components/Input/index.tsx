import React, { FC } from "react";
import { TextInput, StyleSheet, TextStyle } from "react-native";
import Text from "../Text";

type InputProps = {
  title?: string;
  placeholder?: string;
  onChangeText(text:string):void;
  withoutBorder?: boolean;
  style?: TextStyle,
  autoFocus: boolean,
  value?: string;
}

const Input:FC<InputProps> = ({
  title,
  placeholder,
  onChangeText,
  style,
  autoFocus=false,
  withoutBorder=false,
  value
}) => {
  return (
    <>
    {!!title && <Text style={styles.title}>{title}</Text>}
    <TextInput
      onChangeText={onChangeText}
      autoFocus={autoFocus}
      value={value}
      placeholder={placeholder}
      style={[
        style,
        styles.textInput,
        {borderWidth: withoutBorder ? 0 : 1}
      ]}/>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
  
  },
  textInput: {
    borderColor:'#c1c9d4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6
  }
})

export default Input