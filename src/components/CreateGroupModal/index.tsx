import React, { FC, useState}from "react";
import { Modal, StyleSheet, View } from "react-native";
import useGroup from "../../contexts/RoomContext";

import BottomModal from "../BottomModal";
import Button from "../Button";
import Input from "../Input";
import Popup from "../Popup";

type CreateGroupModalProps = {
  closeModal(arg:boolean): void;
}

const CreateGroupModal:FC<CreateGroupModalProps> = ({closeModal}) => {
  const {createRoom} = useGroup();
  const [groupName, setGroupName] = useState("");
  const [code, setCode] = useState("");

  const handleCreateGroup = () => {
    createRoom(code,groupName)
    setGroupName("");
    setCode("");
  }

  return (
    <BottomModal closeModal={() => closeModal(false)} title="Criar grupo">
        <Input title="Nome do grupo" style={styles.input} onChangeText={(text:string) => setGroupName(text)} placeholder="Digite aqui o código do grupo que você deseja criar"/>
        <Input title="Código do grupo" onChangeText={(text:string) => setCode(text)} placeholder="Digite aqui o nome do grupo"/>
        <Button buttonStyle={styles.button} onPress={handleCreateGroup}>Criar grupo</Button>
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

export default CreateGroupModal;