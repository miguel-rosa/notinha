import React, { FC, useState} from "react"
import { StyleSheet, TouchableOpacity } from "react-native";
import IconCheck from "../Icons/IconCheck";

type CheckboxProps = {
  checked: boolean;
  setChecked(p:any): void;
}

const Checkbox:FC<CheckboxProps> = ({checked, setChecked}) => {
  return (
    <TouchableOpacity style={styles.checkBox} onPress={() => setChecked((previousChecked:boolean) => !previousChecked )}>
      {checked && <IconCheck style={styles.icon}/>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkBox: {
    width: 22,
    height: 22,
    borderWidth:1.8,
    borderColor: "black",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    position: "absolute"
  }
})

export default Checkbox;