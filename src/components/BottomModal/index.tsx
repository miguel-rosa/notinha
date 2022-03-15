import React, { FC } from 'react';
import {View, Text, StyleSheet} from 'react-native'
import Button from '../Button';
import {Ionicons} from '@expo/vector-icons'

type BottomModalProps = {
  title: string;
  buttonOptions?: {
    show?: boolean,
    text?: string
  },
  closeModal(): void;
  height?: number;
}

const BottomModal:FC<BottomModalProps> = (
  {title, children, buttonOptions={show: false}, closeModal, height}) => {
  return(
    <View style={[styles.bottomModal, {height:height}]} >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Ionicons size={24} style={styles.close} name='md-close' color='black' onPress={closeModal}/>
      </View>
      {children}
      {buttonOptions.show && <Button>{buttonOptions.text}</Button>}
    </View>
  )
}

const styles = StyleSheet.create({
  bottomModal: {
    zIndex:10,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // height: 500,
    position: 'absolute',
    elevation: 1,
    alignSelf: 'stretch',
    left:0,
    right:0,
    bottom:0
    // ,   borderTopStartRadius: 9
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#ebedf0',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    padding: 16,
  },
  title: {
    fontSize: 16
  },
  close: {
    position: 'absolute',
    right: 16,
    alignSelf: 'center',
    top: 16
  }
})

export default BottomModal;