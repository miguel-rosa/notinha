import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import{ v4 as uuid} from "uuid";
import useGroup from "../../contexts/RoomContext";


import BottomModal from "../BottomModal";
import Button from "../Button";
import IconPlus from "../Icons/IconPlus";
import IconTrash from "../Icons/IconTrash";
import Input from "../Input";

type AddNoteButtonProps = {

}

const AddNoteForm:FC<AddNoteButtonProps> = ({}) => {
  const {addNote} = useGroup();
  const [text, setText] = useState("");
  
  const onAddNoteButtonPress = async () => {
    if(!text) return
    const id = uuid();
    await addNote({
      id,
      text,
      checked: false
    })
    setText("");
  }

  return (
    <View style={styles.addNoteForm}>
      <Input
        autoFocus={true}
        withoutBorder={true}
        value={text}
        placeholder="O que você quer anotar hoje?"
        onChangeText={(inputText) => setText(inputText)}
        style={styles.input}
      />
    <TouchableOpacity
      style={styles.addNoteButton}
      onPress={onAddNoteButtonPress}
    >
      <IconPlus size={35}/>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  addNoteForm: {
    position: "absolute",
    bottom: 16,
    right: 16,
    left: 16,
    flexDirection: "row"
  },
  addNoteButton: {
    
    width: 50,
    height: 50,
    borderRadius:50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d66ff"
  },
  form: {
    
  },
  input: {
    backgroundColor:"white",
    alignSelf: "stretch",
    flex: 1,
    marginRight:10,
    borderRadius:90
  }
})

export default AddNoteForm