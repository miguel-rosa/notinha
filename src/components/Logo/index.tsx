import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../Text';

const Logo = () => {
  return (
    <View style={styles.logo}>
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