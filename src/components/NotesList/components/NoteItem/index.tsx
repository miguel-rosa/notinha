import React, { FC, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import useNoteOptions from "../../../../contexts/NoteOptionsContext";
import useGroup from "../../../../contexts/RoomContext";
import BottomModal from "../../../BottomModal";
import Button from "../../../Button";
import Checkbox from "../../../Checkbox";
import IconTrash from "../../../Icons/IconTrash";
import Text from "../../../Text";

type NoteItemProps = {
  id: string;
  text: string;
  checked: boolean;
}

const NoteItem: FC<NoteItemProps> = ({ id, text, checked }) => {
  const [isChecked, setIsChecked] = useState(checked)
  
  const { handleNoteCheck } = useGroup();
  const {showOptions} = useNoteOptions();

  useEffect(() => {
    // handleNoteCheck(id, isChecked)
  }, [isChecked])


  const handleNoteClick = () => {
    setIsChecked((previousIsChecked) => !previousIsChecked)
    console.log("checked", checked, isChecked)
    handleNoteCheck(id, !isChecked)
  }

  const handleNoteLongPress = () => {
    showOptions(id)
  }

  return (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={handleNoteClick}
      onLongPress={handleNoteLongPress}
    >
      <Checkbox checked={isChecked} onPress={handleNoteClick} />
      <Text style={[styles.text, isChecked && { opacity: .7, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  noteItem: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,

  },
  text: {
    marginLeft: 10
  }
})

export default NoteItem;