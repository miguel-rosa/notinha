import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { StyleSheet } from "react-native";
import { auth } from "../../../data/firebase";
import Button from "../Button";

const SignInButton = () => {
  const onButtonPress = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      console.log("token", token)
      // The signed-in user info.
      const user = result.user;
      console.log("user", user)

    }).catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error("Error while signin user", error, credential)
    });
  }
  return (
    <Button buttonStyle={styles.button} onPress={onButtonPress}>Entrar com o Google</Button>
  )
}


const styles = StyleSheet.create({
  button: {}
})


export default SignInButton

