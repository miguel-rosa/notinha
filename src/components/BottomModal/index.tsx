import React, { FC } from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../Button';
import Text from '../Text';
import IconClose from '../Icons/IconClose';

type BottomModalProps = {
  title: string;
  buttonOptions?: {
    show?: boolean,
    text?: string,
    position?: 'stretch' | 'center' | 'left' | 'right',
    size?: 'big' | 'medium' | 'small',
    type?: 'primary' | 'secondary'
  },
  closeModal(): void;
  height?: number;
  onPress?():void;
}

const BottomModal:FC<BottomModalProps> = ({
  title,
  children,
  buttonOptions = {
    position:'stretch',
    show: false,
    size: 'medium',
  },
  closeModal,
  height,
  onPress,
}) => {
  const buttonPosition = {
    'stretch':'stretch',
    'center':'center',
    'left':'flex-start',
    'right':'flex-end',
  };
  return (
    <View style={[styles.bottomModal, {height:height}]} >
      <View style={styles.header}>
        <Text  style={styles.title}>{title}</Text>
        <IconClose onPress={closeModal} style={styles.close}/>
      </View>
      <View style={styles.content}>
        {children}
        {buttonOptions.show && (
          <View style={{
            alignItems: buttonPosition[buttonOptions.position || 'stretch'],
            paddingTop: 18,
          }}>
            <Button
              useSpacing={false}
              size={buttonOptions.size}
              type={buttonOptions.type}
              onPress={onPress}
            >
              {buttonOptions.text}
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomModal: {
    zIndex:10,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // height: 500,
    position: 'absolute',
    elevation: 10,
    alignSelf: 'stretch',
    left:0,
    right:0,
    bottom:0,
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
    fontSize: 16,
  },
  close: {
    position: 'absolute',
    right: 16,
    alignSelf: 'center',
    top: 13,
  },
  content: {
    padding: 20,
  },
});

export default BottomModal;
