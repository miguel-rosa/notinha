import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { auth } from "../../../data/firebase";
import Button from "../Button";

const SignOutButton = () => {
  const navigation = useNavigation()
  const onButtonPress = () => {
    auth.signOut().then(() => {
      navigation.navigate("SignIn")
    })
  }
  return (
    <Button buttonStyle={styles.button} type="secondary" onPress={onButtonPress}>Sair</Button>
  )
}


const styles = StyleSheet.create({
  button: {
  position: "absolute",
  bottom: 20,
  left:20,
  right:20
  }
})


export default SignOutButton

