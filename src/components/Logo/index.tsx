import React, {FC} from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Text from '../Text';

type LogoProps = {
  style: ViewStyle
}

const Logo:FC<LogoProps> = ({style}) => {
  return (
    <View style={[styles.logo, style]}>
      <Text style={styles.logoText} weight="700">nótinha</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    flex:1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 40,
    color: "rgb(13, 102, 255)X"
  }
})

export default Logo