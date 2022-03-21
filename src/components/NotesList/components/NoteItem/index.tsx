import React, { FC, useState, useEffect} from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import useGroup from "../../../../contexts/RoomContext";
import Checkbox from "../../../Checkbox";
import Text from "../../../Text";

type NoteItemProps = {
  id: string;
  text: string;
  checked: boolean;
}

const NoteItem:FC<NoteItemProps> = ({id, text, checked}) => {
  const [isChecked, setIsChecked] = useState(checked)
  const {handleNoteCheck} = useGroup();

  useEffect(() => {
    // handleNoteCheck(id, isChecked)
  }, [isChecked])
  
  
  const handleNoteClick = () => {
    setIsChecked((previousIsChecked) => !previousIsChecked)
    console.log("checked", checked, isChecked)
    handleNoteCheck(id, !isChecked)
  }
  
  return (
    <TouchableOpacity style={styles.noteItem} onPress={handleNoteClick}>
      <Checkbox checked={isChecked}/>
      <Text style={[styles.text, isChecked && {opacity: .7, textDecorationLine: 'line-through', textDecorationStyle: 'solid'}]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingVertical:6
  },
  text: {
    marginLeft: 10,
    fontSize: 18
  }
})

export default NoteItem;