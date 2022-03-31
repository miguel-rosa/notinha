import React, { FC, useState} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import IconCheck from '../Icons/IconCheck';

type CheckboxProps = {
  checked: boolean;
  onPress?(): void;
}

const Checkbox:FC<CheckboxProps> = ({checked, onPress}) => {
  return (
    <TouchableOpacity accessibilityRole="button" style={styles.checkBox} onPress={onPress}>
      {checked && <IconCheck color="rgb(118,118,118)" style={styles.icon}/>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    width: 22,
    height: 22,
    borderWidth:1,
    borderColor: 'rgb(220,220,220)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  icon: {
    position: 'absolute',
  },
});

export default Checkbox;
