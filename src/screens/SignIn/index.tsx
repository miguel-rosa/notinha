import React, { useState } from "react";
import Text from "../../components/Text";
import { StyleSheet, View } from "react-native";
import Logo from "../../components/Logo";
import SignInButton from "../../components/SignInButton";
import JoinRoomButton from "../../components/JoinRoomButton";
import Button from "../../components/Button";
import JoinGroupModal from "../../components/JoinGroupModal";

const SignIn = () => {
  const [showBottomModal, setShowBottomModal] = useState(false);
  return (
    <View style={styles.signIn}>
      <View style={styles.logo}>
        <Logo style={styles.iconLogo}/>
        <Text style={styles.text}>Crie e compartilhe notas rapidamente</Text>
      </View>
      <View>
        <SignInButton />
        {/* <Button type='secondary' onPress={() => setShowBottomModal(true)}>Entrar em um grupo sem login</Button> */}
      </View>
      {/* {showBottomModal && <JoinGroupModal closeModal={() => setShowBottomModal(false)}/>} */}
    </View>
  )
}

const styles = StyleSheet.create({
  signIn:{
    flex: 1,
    padding:20,
    justifyContent: "flex-end",
  },
  logo: {
    flex:1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  iconLogo: {
    flex: 0.1
  },
  text: {
    textAlign: "center",
  }
})

export default SignIn