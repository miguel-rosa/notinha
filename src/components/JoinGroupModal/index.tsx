import React, { FC, useState}from "react";
import { StyleSheet, View } from "react-native";
import useGroup from "../../contexts/RoomContext";

import BottomModal from "../BottomModal";
import Button from "../Button";
import Input from "../Input";

type JoinGroupModalProps = {
  closeModal(arg:boolean): void;
}

const JoinGroupModal:FC<JoinGroupModalProps> = ({closeModal}) => {
  const {getRoom} = useGroup();
  const [code, setCode] = useState("");
  return (
    <BottomModal closeModal={() => closeModal(false)} title="Entrar em um grupo">
      <View style={styles.view}>
        <Input onChangeText={(text:string) => setCode(text)} placeholder="Digite aqui o código do grupo"/>
        <Button onPress={() => getRoom(code) }>Entrar no grupo</Button>
      </View>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  view: {
    padding: 20
  }
})

export default JoinGroupModal;