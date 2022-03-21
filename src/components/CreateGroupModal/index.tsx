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
  const {createRoom, initiated, hasRoom} = useGroup();
  const [code, setCode] = useState("");
  return (
    <BottomModal closeModal={() => closeModal(false)} title="Criar grupo">
        <Input onChangeText={(text:string) => setCode(text)} placeholder="Digite aqui o código do grupo que você deseja criar"/>
        <Button onPress={() => createRoom(code) }>Criar grupo</Button>
    </BottomModal>
  )
}

export default CreateGroupModal;