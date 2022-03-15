import React, { FC } from "react";
import { TextInput, Text, StyleSheet } from "react-native";

type InputProps = {
  title?: string;
  placeholder?: string;
  onChangeText(text:string):void;
}

const Input:FC<InputProps> = ({title, placeholder, onChangeText}) => {
  return (
    <>
    {!!title && <Text style={styles.title}>{title}</Text>}
    <TextInput onChangeText={onChangeText} placeholder={placeholder} style={styles.textInput}/>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
  
  },
  textInput: {
    borderColor:'#c1c9d4',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6
  }
})

export default Input