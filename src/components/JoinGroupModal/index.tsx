import React, { FC, useState}from "react";
import { Modal, StyleSheet, View } from "react-native";
import useGroup from "../../contexts/RoomContext";

import BottomModal from "../BottomModal";
import Button from "../Button";
import Input from "../Input";
import Popup from "../Popup";

type JoinGroupModalProps = {
  closeModal(arg:boolean): void;
}

const JoinGroupModal:FC<JoinGroupModalProps> = ({closeModal}) => {
  const {getRoom, initiated, hasRoom} = useGroup();
  const [code, setCode] = useState("");
  return (
    <BottomModal closeModal={() => closeModal(false)} title="Entrar em um grupo">
        {/* <Popup visible={initiated && !hasRoom} animationType="slide" title="Grupo não encontrado" text="Confira se o código foi digitado corretamente e tente novamente"/> */}
        <Input style={styles.input} title="Código do grupo" onChangeText={(text:string) => setCode(text)} placeholder="Digite aqui o código do grupo"/>
        <Button buttonStyle={styles.button} onPress={() => getRoom(code) }>Entrar no grupo</Button>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 8
  },
  button: {
    marginTop: 16
  }
})

export default JoinGroupModal;